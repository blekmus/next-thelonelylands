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
import { gql, useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import mediaQuery from '../lib/mediaQuery'
import Head from 'next/head'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface Entry {
  title: string
  notes: string
  cover: string
  cover_type: 'LINK' | 'FILE'
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER' | string
  status: 'PUBLISHED' | 'DRAFT'
}

const QUERY = gql`
  query Query($entryId: ID!) {
    entry(id: $entryId) {
      id
      title
      notes
      created_at
      updated_at
      type
      cover
      status
      cover_type
    }
  }
`

const UPDATE_QUERY = gql`
  mutation Mutation($updateEntryId: ID!, $content: EntryUpdateContent!) {
    updateEntry(id: $updateEntryId, content: $content) {
      id
    }
  }
`

const DELETE_QUERY = gql`
  mutation Mutation($entryId: ID!) {
    deleteEntry(id: $entryId) {
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

const AdminEdit = ({ id }: { id: string }) => {
  const router = useRouter()

  const entryTitleRef = useRef<HTMLInputElement>(null)
  const entryCoverRef = useRef<HTMLInputElement>(null)
  const entryContentRef = useRef<HTMLTextAreaElement>(null)

  const [saveLoading, setSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [publishModalOpened, setPublishModalOpened] = useState(false)
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [saveTypeOpened, setSaveTypeOpened] = useState(false)

  const [saveType, setSaveType] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [initialSaveType, setInitialSaveType] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')

  const [entryLastUpdated, setEntryLastUpdated] = useState<string>()
  const [entryCover, setEntryCover] = useState<string | null>(null)
  const [entryCoverFilename, setEntryCoverFilename] = useState<string | null>(
    null
  )
  const [entryTitle, setEntryTitle] = useState<string | null>(null)
  const [entryContent, setEntryContent] = useState<string | null>(null)
  const [entryDate, setEntryDate] = useState<number | null>(null)
  const [entryType, setEntryType] = useState<null | string>(null)

  useQuery(QUERY, {
    variables: {
      entryId: id,
    },
    onCompleted: (data) => {
      setEntryTitle(data.entry.title)
      setEntryDate(Number(data.entry.created_at))
      setEntryType(data.entry.type)
      setEntryContent(data.entry.notes)
      setSaveType(data.entry.status)
      setInitialSaveType(data.entry.status)
      setEntryLastUpdated(data.entry.updated_at)

      if (data.entry.cover_type === 'FILE') {
        setEntryCover(
          `https://caiden-thelonelylands.s3.eu-central-003.backblazeb2.com/${data.entry.cover}`
        )
        setEntryCoverFilename(data.entry.cover)
      } else {
        setEntryCover(data.entry.cover)
      }
    },
    onError: () => {
      router.push('/admin/dashboard')
    },
  })

  const { classes, theme } = useStyles({ saveTypeOpened })

  const [updateEntry] = useMutation(UPDATE_QUERY, {
    onCompleted: () => {
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

  const [deleteEntry] = useMutation(DELETE_QUERY, {
    onCompleted: () => {
      router.push('/admin/entries')
    },
    onError: (error) => {
      console.log(error)
      setDeleteLoading(false)
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to delete
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

    if (
      !entryTitle ||
      entryTitle === '' ||
      !entryContent ||
      entryContent === '' ||
      entryType === null
    ) {
      setSaveLoading(false)
      return
    }

    entry.title = entryTitle
    entry.notes = entryContent
    entry.type = entryType
    entry.created_at = String(entryDate)
    entry.status = saveType

    if (entryCover && entryCover !== '') {
      if (
        entryCoverFilename &&
        entryCover ===
          `https://caiden-thelonelylands.s3.eu-central-003.backblazeb2.com/${entryCoverFilename}`
      ) {
        entry.cover_type = 'FILE'
        entry.cover = entryCoverFilename
      } else if (entryCover.startsWith('blob:')) {
        // delete last image
        if (entryCoverFilename) {
          await fetch('/api/upload/delete_image', {
            method: 'POST',
            body: JSON.stringify({
              filename: entryCoverFilename,
            }),
          })
        }

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
        // delete last image
        if (entryCoverFilename) {
          await fetch('/api/upload/delete_image', {
            method: 'POST',
            body: JSON.stringify({
              filename: entryCoverFilename,
            }),
          })
        }

        entry.cover_type = 'LINK'
        entry.cover = entryCover
      }
    }

    updateEntry({ variables: { updateEntryId: id, content: entry } })
  }

  const handleSaveBtn = () => {
    setSaveLoading(true)

    if (initialSaveType === 'DRAFT' && saveType === 'PUBLISHED') {
      setPublishModalOpened(true)
    } else {
      saveEntry()
    }
  }

  const handleDeleteBtn = async () => {
    if (entryCoverFilename) {
      await fetch('/api/upload/delete_image', {
        method: 'POST',
        body: JSON.stringify({
          filename: entryCoverFilename,
        }),
      })
    }

    deleteEntry({ variables: { entryId: id } })
  }

  return (
    <>
      <Head>
        <title>Editing {entryTitle} - Admin | The Lonely Lands</title>
      </Head>

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
              <Text size="xl" color="blue" weight={700}>
                Publishing
              </Text>
            </Center>

            <Center>
              <Text size="md">This draft will be visible publicly</Text>
            </Center>

            <SimpleGrid spacing={'xl'} cols={2} mt={30}>
              <Button
                color={'gray'}
                variant={'light'}
                onClick={() => {
                  setPublishModalOpened(false)
                  setSaveLoading(false)
                }}
              >
                Cancel
              </Button>
              <Button color="blue" onClick={saveEntry}>
                Confirm
              </Button>
            </SimpleGrid>
          </Modal>

          <Modal
            opened={deleteModalOpened}
            withCloseButton={false}
            onClose={() => {
              setDeleteLoading(false)
              setDeleteModalOpened(false)
            }}
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
              <Text size="sm">Deleting is permanent</Text>
            </Center>

            <SimpleGrid spacing={'xl'} cols={2} mt={30}>
              <Button
                color={'gray'}
                variant={'light'}
                onClick={() => setDeleteModalOpened(false)}
              >
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => {
                  setDeleteLoading(true)
                  handleDeleteBtn()
                }}
                loading={deleteLoading}
              >
                Confirm
              </Button>
            </SimpleGrid>
          </Modal>

          <Container className={classes.topbar_header} size={2000}>
            <Group>
              <Title order={3}>Edit Entry</Title>
            </Group>

            <Group>
              <Button
                color="gray"
                variant="subtle"
                onClick={() => {
                  setDeleteModalOpened(true)
                }}
              >
                <Text>Delete</Text>
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
              <Text size="sm" mb={20} weight={600}>
                Last updated:{' '}
                {dayjs(Number(entryLastUpdated)).format('D MMM, YYYY')} (
                {dayjs(Number(entryLastUpdated)).fromNow()})
              </Text>

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
                defaultValue={entryTitle ? entryTitle : ''}
              />

              <SimpleGrid mb={20} cols={2}>
                <Select
                  className={classes.text_input}
                  placeholder="Type"
                  onChange={setEntryType}
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
                  value={entryDate ? new Date(entryDate) : null}
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
                defaultValue={entryCover ? entryCover : ''}
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
                size="sm"
                defaultValue={entryContent ? entryContent : ''}
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
                title={entryTitle ? entryTitle : ''}
                notes={entryContent ? entryContent : ''}
                cover={entryCover ? entryCover : undefined}
              />
            </Container>
          </Box>
        </SimpleGrid>
      </div>
    </>
  )
}

export default AdminEdit
