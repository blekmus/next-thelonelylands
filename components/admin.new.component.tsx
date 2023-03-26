import {
  Group,
  Header,
  Container,
  createStyles,
  Button,
  Modal,
  Title,
  Text,
  SimpleGrid,
  Box,
  Input,
  Textarea,
  Select,
  Menu,
  Center,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useRef, useState } from 'react'
import {
  IconCalendar,
  IconNorthStar,
  IconChevronDown,
  IconPhoto,
  IconHeading,
  IconX,
} from '@tabler/icons'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import Article from './article.component'
import { useLocalStorage } from '@mantine/hooks'
import { gql, useMutation } from '@apollo/client'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import mediaQuery from '../lib/mediaQuery'

interface Entry {
  title: string
  notes: string
  cover: string
  cover_type: 'LINK' | 'FILE'
  created_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER' | string
  status: 'PUBLISHED' | 'DRAFT'
}

const CREATE_ENTRY = gql`
  mutation Mutation($content: EntryCreateContent!) {
    createEntry(content: $content) {
      id
    }
  }
`

const useStyles = createStyles(
  (theme, { saveTypeOpened }: { saveTypeOpened: boolean }) => ({
    topbar: {
      position: 'sticky',
      zIndex: 2,
    },

    topbar_header: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    text_input: {
      'input, textarea': {
        backgroundColor: '#222428',
        border: 'none',
      },
    },

    dropzone: {
      position: 'relative',
      border: 'none',
      backgroundColor: '#222428',
    },

    cover_box: {
      width: '100%',
      height: '200px',
      position: 'relative',
      marginBottom: '10px',
      borderRadius: '4px',

      img: {
        objectFit: 'cover',
      },
    },

    save_type_icon: {
      transition: 'transform 150ms ease',
      transform: saveTypeOpened ? 'rotate(180deg)' : 'rotate(0deg)',
    },

    main_grid: {
      [mediaQuery[2]]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },

    grid_left: {
      [mediaQuery[2]]: {
        height: 'auto',
        borderRight: 'none',
      },
    },

    grid_right: {
      [mediaQuery[2]]: {
        height: 'auto',
        minHeight: 'auto',
        backgroundColor: 'initial',
        borderTop: `solid 1px ${theme.colors.dark[5]}`,
      },
    },

    right_content: {
      [mediaQuery[2]]: {
        paddingTop: 20,
        paddingBottom: 0,
      },
    },
  })
)

const AdminNew = () => {
  const router = useRouter()

  const entryTitleRef = useRef<HTMLInputElement>(null)
  const entryCoverRef = useRef<HTMLInputElement>(null)
  const entryContentRef = useRef<HTMLTextAreaElement>(null)

  const [publishModalOpened, setPublishModalOpened] = useState(false)
  const [resetModalOpened, setResetModalOpened] = useState(false)
  const [saveTypeOpened, setSaveTypeOpened] = useState(false)

  const [saveLoading, setSaveLoading] = useState(false)

  const [saveType, setSaveType] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')

  const [entryCover, setEntryCover] = useLocalStorage({
    key: 'new-entry-cover',
    defaultValue: '',
  })
  const [entryTitle, setEntryTitle] = useLocalStorage({
    key: 'new-entry-title',
    defaultValue: '',
  })
  const [entryContent, setEntryContent] = useLocalStorage({
    key: 'new-entry-content',
    defaultValue: '',
  })
  const [entryDate, setEntryDate] = useLocalStorage<number>({
    key: 'new-entry-date',
    defaultValue: new Date().getTime(),
  })
  const [entryType, setEntryType] = useLocalStorage({ key: 'new-entry-type' })

  const { classes, theme } = useStyles({ saveTypeOpened })

  const [createEntry] = useMutation(CREATE_ENTRY, {
    onCompleted: () => {
      handleResetBtn()
      router.push('/admin/entries')
    },
    onError: (error) => {
      console.log(error)
      setSaveLoading(false)
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to save
          </Text>
        ),
        color: 'red',
        icon: <IconX />,
      })
    },
  })

  const saveEntry = async () => {
    setPublishModalOpened(false)

    const entry = {} as Entry

    if (entryTitle === '' || entryContent === '' || entryType === null) {
      setSaveLoading(false)
      return
    }

    entry.title = entryTitle
    entry.notes = entryContent
    entry.type = entryType
    entry.created_at = String(entryDate)
    entry.status = saveType

    if (entryCover !== '') {
      if (entryCover.startsWith('blob:')) {
        const coverFile: File = (await fetch(entryCover).then((r) =>
          r.blob()
        )) as File

        const formData = new FormData()
        formData.append('file', coverFile)

        const resp = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        })

        const data = await resp.json()

        entry.cover_type = 'FILE'
        entry.cover = data.url
      } else {
        entry.cover_type = 'LINK'
        entry.cover = entryCover
      }
    }

    createEntry({ variables: { content: entry } })
  }

  const handleSaveBtn = () => {
    setSaveLoading(true)

    if (saveType === 'PUBLISHED') {
      setPublishModalOpened(true)
    } else {
      saveEntry()
    }
  }

  const handleResetBtn = () => {
    setEntryCover('')
    setEntryContent('')
    setEntryDate(new Date().getTime())
    setEntryTitle('')
    setEntryType('')

    if (entryTitleRef.current) {
      entryTitleRef.current.value = ''
    }

    if (entryContentRef.current) {
      entryContentRef.current.value = ''
    }

    if (entryCoverRef.current) {
      entryCoverRef.current.value = ''
    }

    setResetModalOpened(false)
  }

  return (
    <div style={{ minHeight: '100%' }}>
      <Header height={60} className={classes.topbar}>
        <Modal
          opened={publishModalOpened}
          withCloseButton={false}
          onClose={() => {
            setPublishModalOpened(false)
            setSaveLoading(false)
          }}
          centered
          size={'sm'}
          padding="xl"
        >
          <Center>
            <Text size="md">This will be published publicly</Text>
          </Center>

          <SimpleGrid spacing={'xl'} cols={2} mt={30}>
            <Button
              color={'gray'}
              variant={'light'}
              onClick={() => setPublishModalOpened(false)}
            >
              Cancel
            </Button>
            <Button color="blue" onClick={saveEntry}>
              Confirm
            </Button>
          </SimpleGrid>
        </Modal>

        <Modal
          opened={resetModalOpened}
          withCloseButton={false}
          onClose={() => setResetModalOpened(false)}
          centered
          size={'sm'}
          padding="xl"
        >
          <Center>
            <Text size="xl" color="red" weight={700}>
              Warning
            </Text>
          </Center>

          <Center>
            <Text size="sm">Resetting is permanent</Text>
          </Center>

          <SimpleGrid spacing={'xl'} cols={2} mt={30}>
            <Button
              color={'gray'}
              variant={'light'}
              onClick={() => setResetModalOpened(false)}
            >
              Cancel
            </Button>
            <Button color="red" onClick={handleResetBtn}>
              Confirm
            </Button>
          </SimpleGrid>
        </Modal>

        <Container className={classes.topbar_header} size={2000}>
          <Group>
            <Title order={3}>New Entry</Title>
          </Group>

          <Group>
            <Button
              color={'gray'}
              variant="subtle"
              onClick={() => setResetModalOpened(true)}
            >
              <Text>Reset</Text>
            </Button>

            <Menu
              onOpen={() => setSaveTypeOpened(true)}
              onClose={() => setSaveTypeOpened(false)}
              width="target"
            >
              <Menu.Target>
                <Button color={'gray'}>
                  <Group spacing="xs">
                    <Text>{saveType === 'DRAFT' ? 'Draft' : 'Publish'}</Text>
                    <IconChevronDown
                      size={16}
                      className={classes.save_type_icon}
                      stroke={1.5}
                    />
                  </Group>
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => setSaveType('DRAFT')}>
                  <Text>Draft</Text>
                </Menu.Item>
                <Menu.Item onClick={() => setSaveType('PUBLISHED')}>
                  <Text>Publish</Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Button
              color={'gray'}
              onClick={handleSaveBtn}
              loading={saveLoading}
            >
              <Text>Save</Text>
            </Button>
          </Group>
        </Container>
      </Header>

      <SimpleGrid cols={2} spacing={0} className={classes.main_grid}>
        <Box
          sx={{
            borderRight: `solid 1px ${theme.colors.dark[5]}`,
            paddingLeft: '50px',
            paddingRight: '50px',

            [mediaQuery[1]]: {
              paddingLeft: '0',
              paddingRight: '0',
            },
          }}
          className={classes.grid_left}
        >
          <Container pt={30} mb={20}>
            <Dropzone
              mb={20}
              onDrop={(e) => {
                if (entryCoverRef.current) {
                  entryCoverRef.current.value = URL.createObjectURL(e[0])
                }
                setEntryCover(URL.createObjectURL(e[0]))
              }}
              className={classes.dropzone}
              accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp]}
              maxSize={5 * 1024 ** 2}
            >
              <div style={{ pointerEvents: 'none' }}>
                <Text align="center" color="dimmed" size="md">
                  <Dropzone.Accept>Drop image here</Dropzone.Accept>
                  <Dropzone.Reject>Invalid File (5mb Max)</Dropzone.Reject>
                  <Dropzone.Idle>
                    {entryCover ? 'Change' : 'Cover image'}
                  </Dropzone.Idle>
                </Text>
              </div>
            </Dropzone>

            <Input
              icon={<IconHeading size={18} />}
              ref={entryTitleRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEntryTitle(e.target.value)
              }
              placeholder="Title"
              mb={20}
              variant="filled"
              size="md"
              className={classes.text_input}
              defaultValue={entryTitle}
            />

            <SimpleGrid mb={20} cols={2}>
              <Select
                className={classes.text_input}
                placeholder="Type"
                onChange={(e) => (e ? setEntryType(e) : setEntryType(''))}
                value={entryType}
                size="md"
                icon={<IconNorthStar size={18} />}
                data={[
                  { label: 'Movie', value: 'MOVIE' },
                  { label: 'Series', value: 'SERIES' },
                  { label: 'Poem', value: 'POEM' },
                  { label: 'Essay', value: 'ESSAY' },
                  { label: 'Story', value: 'STORY' },
                  { label: 'Other', value: 'OTHER' },
                ]}
                variant="filled"
                styles={(theme) => ({
                  item: {
                    '&[data-selected]': {
                      '&, &:hover': {
                        backgroundColor: theme.fn.variant({
                          variant: 'light',
                          color: theme.primaryColor,
                        }).background,
                        color: theme.fn.variant({
                          variant: 'light',
                          color: theme.primaryColor,
                        }).color,
                      },
                    },
                  },
                })}
              />

              <DatePicker
                placeholder="Date"
                className={classes.text_input}
                icon={<IconCalendar size={18} />}
                variant="filled"
                allowFreeInput
                size="md"
                labelFormat="YYYY/MM/DD"
                inputFormat="YYYY/MM/DD"
                value={new Date(entryDate)}
                onChange={(e) => {
                  e ? setEntryDate(e.getTime()) : null
                }}
              />
            </SimpleGrid>

            <Input
              ref={entryCoverRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEntryCover(e.target.value)
              }
              placeholder="Cover image URL"
              icon={<IconPhoto size={18} />}
              mb={20}
              variant="filled"
              size="md"
              className={classes.text_input}
              defaultValue={entryCover}
            />

            <Textarea
              ref={entryContentRef}
              onChange={(e) => {
                setEntryContent(e.target.value)
              }}
              placeholder="Content"
              autosize
              minRows={2}
              variant="filled"
              size="md"
              defaultValue={entryContent}
              className={classes.text_input}
            />
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'var(--background)',
            minHeight: 'calc(100vh - 60px)',
            width: '100%',

            paddingLeft: '50px',
            paddingRight: '50px',

            [mediaQuery[1]]: {
              paddingLeft: '0',
              paddingRight: '0',
            },
          }}
          className={classes.grid_right}
        >
          <Container pt={30} mb={20} className={classes.right_content}>
            <Article
              title={entryTitle}
              notes={entryContent}
              cover={entryCover}
            />
          </Container>
        </Box>
      </SimpleGrid>
    </div>
  )
}

export default AdminNew
