import {
  Group,
  Header,
  Container,
  createStyles,
  Button,
  Title,
  Text,
  SimpleGrid,
  Box,
  Select,
  Stack,
  Paper,
  Pagination,
  Center,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconNorthStar, IconX, IconEye } from '@tabler/icons'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import Article from './article.component'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import mediaQuery from '../lib/mediaQuery'

const useStyles = createStyles((theme) => ({
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

  chip: {
    'label[data-variant="filled"]': {
      backgroundColor: '#222428',
    },
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
    },
  },

  grid_right: {
    [mediaQuery[2]]: {
      height: 'auto',
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

  status_search_grid: {
    [mediaQuery[0]]: {
      gridTemplateColumns: '1fr',
    },
  },

  main_cont: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
}))

const QUERY = gql`
  query {
    entries {
      id
      title
      notes
      created_at
      updated_at
      type
      cover
      status
    }
  }
`

interface Entry {
  id: string
  title: string
  notes: string
  cover: string
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
  status: 'PUBLISHED' | 'DRAFT'
}

const AdminEntryList = () => {
  const router = useRouter()

  const perPage = 5
  const [viewPage, setViewPage] = useState<number>(1)
  const [viewStatus, setViewStatus] = useState<
    'ALL' | 'PUBLISHED' | 'DRAFT' | string | null
  >('ALL')
  const [viewType, setViewType] = useState<string | null>('ALL')
  // const [viewQuery, setViewQuery] = useState<string>('')

  const [editLoading, setEditLoading] = useState(false)

  const [allEntries, setAllEntries] = useState<Entry[]>([])
  const [currentEntries, setCurrentEntries] = useState<Entry[]>([])
  const [currentVisibleEntries, setCurrentVisibleEntries] = useState<Entry[]>(
    []
  )
  const [selectedEntryId, setSelectedEntryId] = useState<string>()
  const [selectedEntry, setSelectedEntry] = useState<Entry>()

  useQuery(QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setAllEntries(data.entries)
    },
    onError: (e) => {
      console.log(e)
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to load entries
          </Text>
        ),
        color: 'red',
        icon: <IconX />,
      })
    },
  })

  const { classes, theme } = useStyles()

  useEffect(() => {
    if (!selectedEntryId) {
      return
    }

    const selectedEntry = allEntries.filter(
      (entry) => entry.id === selectedEntryId
    )
    setSelectedEntry(selectedEntry[0])
  }, [selectedEntryId, allEntries])

  useEffect(() => {
    let entries = allEntries

    // filter by viewType
    if (viewType && viewType !== 'ALL') {
      entries = entries.filter((entry) => entry.type === viewType)
    }

    // filter by viewStatus
    if (viewStatus && viewStatus !== 'ALL') {
      entries = entries.filter((entry) => entry.status === viewStatus)
    }

    setViewPage(1)
    setCurrentEntries(entries)
    setCurrentVisibleEntries(entries.slice(0, 1 * perPage))
  }, [allEntries, viewType, viewStatus])

  useEffect(() => {
    setCurrentVisibleEntries(
      currentEntries.slice((viewPage - 1) * perPage, viewPage * perPage)
    )
  }, [viewPage, currentEntries])

  return (
    <div style={{ minHeight: '100%' }}>
      <Header height={60} className={classes.topbar}>
        <Container className={classes.topbar_header} size={2000}>
          <Group>
            <Title order={3}>Entries</Title>
          </Group>

          <Group>
            {selectedEntry && (
              <Button
                color={'gray'}
                loading={editLoading}
                onClick={() => {
                  setEditLoading(true)
                  router.push(`/admin/edit/${selectedEntry.id}`)
                }}
              >
                <Text>Edit</Text>
              </Button>
            )}
          </Group>
        </Container>
      </Header>

      <SimpleGrid cols={2} spacing={0} className={classes.main_grid}>
        <Box
          sx={{
            borderRight: `solid 1px ${theme.colors.dark[5]}`,
            height: 'calc(100vh - 60px)',
            overflow: 'auto',
            paddingLeft: '50px',
            paddingRight: '50px',

            [mediaQuery[1]]: {
              paddingLeft: '0',
              paddingRight: '0',
            },
          }}
          className={classes.grid_left}
        >
          <Container pt={30} pb={30}>
            <Text mb={10} weight={700}>
              Filter
            </Text>
            <Box>
              <SimpleGrid
                cols={2}
                mb={15}
                className={classes.status_search_grid}
              >
                <Select
                  size="md"
                  className={classes.text_input}
                  placeholder="Type"
                  onChange={setViewType}
                  value={viewType}
                  icon={<IconNorthStar size={18} />}
                  data={[
                    { label: 'All', value: 'ALL' },
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

                <Select
                  size="md"
                  className={classes.text_input}
                  placeholder="Type"
                  onChange={setViewStatus}
                  value={viewStatus}
                  icon={<IconEye size={18} />}
                  data={[
                    { label: 'All', value: 'ALL' },
                    { label: 'Published', value: 'PUBLISHED' },
                    { label: 'Drafts', value: 'DRAFT' },
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

                {/* <Input
                  size="md"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setViewQuery(e.target.value)
                  }
                  icon={<IconSearch size={18} />}
                  placeholder="Search"
                  variant="filled"
                  className={classes.text_input}
                /> */}
              </SimpleGrid>
            </Box>
          </Container>

          <Container pb={30}>
            <Stack>
              {currentVisibleEntries.map((entry) => {
                return (
                  <Paper
                    key={entry.id}
                    shadow="xs"
                    p="md"
                    sx={{
                      backgroundColor:
                        selectedEntryId === entry.id
                          ? theme.colors.dark[5]
                          : '#222428',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedEntryId(entry.id)}
                  >
                    <Text weight={600}>{entry.title}</Text>
                    <Text size="sm" pt={5} color={theme.colors.gray[6]}>
                      {entry.type.charAt(0) +
                        entry.type.toLocaleLowerCase().slice(1)}{' '}
                      <strong> · </strong>{' '}
                      {entry.status === 'PUBLISHED' ? (
                        'Published'
                      ) : (
                        <span style={{ fontStyle: 'italic' }}>Draft</span>
                      )}
                      <strong> · </strong>
                      {
                        entry.notes
                          .split(' ')
                          .filter((item) => item.trim() !== '').length
                      }{' '}
                      Words
                      <strong> · </strong>
                      {dayjs(Number(entry.created_at)).format('YYYY/MM/DD')}
                      <strong> · </strong>
                      {dayjs(Number(entry.updated_at)).format('YYYY/MM/DD')}
                    </Text>
                  </Paper>
                )
              })}
            </Stack>

            <Center mt={20}>
              <Pagination
                size="lg"
                page={viewPage}
                onChange={setViewPage}
                withControls={false}
                total={Math.trunc((currentEntries.length - 1) / perPage) + 1}
                styles={(theme) => ({
                  item: {
                    '&[data-active]': {
                      backgroundColor: theme.fn.variant({
                        variant: 'light',
                        color: theme.primaryColor,
                      }).background,
                      color: theme.fn.variant({
                        variant: 'light',
                        color: theme.primaryColor,
                      }).color,
                    },

                    border: 'none',
                  },
                })}
              />
            </Center>
          </Container>
        </Box>

        <Box
          sx={{
            height: 'calc(100vh - 60px)',
            backgroundColor: 'var(--background)',
            overflow: 'auto',
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
            {selectedEntry && (
              <Article
                title={selectedEntry.title}
                notes={selectedEntry.notes}
                cover={selectedEntry.cover}
                link={selectedEntry.id}
                link_target="_blank"
              />
            )}
          </Container>
        </Box>
      </SimpleGrid>
    </div>
  )
}

export default AdminEntryList
