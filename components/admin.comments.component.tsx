import {
  Group,
  Header,
  Container,
  createStyles,
  Button,
  Title,
  Text,
  Box,
  Stack,
  Paper,
  Pagination,
  Center,
  Modal,
  SimpleGrid,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconX } from '@tabler/icons'
import { gql, useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { showNotification } from '@mantine/notifications'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)


const useStyles = createStyles(() => ({
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

  content: {},
}))

const QUERY = gql`
  query {
    comments {
      id
      name
      message
      created_at
      viewed
    }
  }
`

const VIEW_QUERY = gql`
  mutation Mutation {
    viewComments {
      count
    }
  }
`

const DELETE_QUERY = gql`
  mutation Mutation($commentId: ID!) {
    deleteComment(id: $commentId) {
      id
    }
  }
`


interface Comment {
  id: string
  name: string
  message: string
  created_at: number
  viewed: boolean
}

const AdminEntryList = () => {
  const perPage = 5
  const [viewPage, setViewPage] = useState<number>(1)
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)

  const [deleteLoading, setDeleteLoading] = useState(false)

  const [currentVisibleComments, setCurrentVisibleComments] = useState<
    Comment[]
  >([])
  const [currentComments, setCurrentComments] = useState<Comment[]>([])
  const [selectedComment, setSelectedComment] = useState<Comment | null>()

  const { refetch } = useQuery(QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setCurrentComments(data.comments)
    },
    onError: (e) => {
      console.log(e)
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to load comments
          </Text>
        ),
        color: 'red',
        icon: <IconX />,
      })
    },
  })

  const [viewComments] = useMutation(VIEW_QUERY, {
    onCompleted: () => {
      refetch()
    },
    onError: (error) => {
      console.log(error)
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to mark as viewed
          </Text>
        ),
        color: 'red',
        icon: <IconX />,
      })
    },
  })

  const [deleteComment] = useMutation(DELETE_QUERY, {
    onCompleted: () => {
      setDeleteModalOpened(false)
      setSelectedComment(null)
      setDeleteLoading(false)
      refetch()
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


  const { classes, theme } = useStyles()

  const handleViewBtn = () => {
    viewComments()
  }

  const handleDeleteBtn = () => {
    setDeleteLoading(true)
    deleteComment({ variables: { commentId: selectedComment?.id } })
  }


  useEffect(() => {
    setCurrentVisibleComments(
      currentComments.slice((viewPage - 1) * perPage, viewPage * perPage)
    )
    setSelectedComment(null)
  }, [currentComments, viewPage])


  return (
    <div style={{ minHeight: '100%' }}>
      <Modal
        opened={deleteModalOpened}
        withCloseButton={false}
        onClose={() => setDeleteModalOpened(false)}
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
          <Button color="red" onClick={handleDeleteBtn} loading={deleteLoading}>
            Confirm
          </Button>
        </SimpleGrid>
      </Modal>

      <Header height={60} className={classes.topbar}>
        <Container className={classes.topbar_header} size={2000}>
          <Group>
            <Title order={3}>Comments</Title>
          </Group>

          <Group>
            {selectedComment && (
              <Button
                color="gray"
                variant="subtle"
                onClick={() => {
                  setDeleteModalOpened(true)
                }}
              >
                <Text>Delete</Text>
              </Button>
            )}
          </Group>
        </Container>
      </Header>

      <Box>
        <Container size={760} mt={40} mb={40} className={classes.content}>
          <Button
            color="blue"
            size="md"
            mb={20}
            variant="light"
            onClick={handleViewBtn}
          >
            Mark all as read
          </Button>

          <Stack>
            {currentVisibleComments.map((comment) => {
              return (
                <Paper
                  key={comment.id}
                  shadow="xs"
                  p="md"
                  sx={{
                    backgroundColor:
                      selectedComment === comment
                        ? theme.colors.dark[5]
                        : '#222428',
                    cursor: 'pointer',
                    borderLeft:
                      comment.viewed === false
                        ? `4px solid ${theme.colors.blue[2]}`
                        : selectedComment === comment
                        ? `4px solid ${theme.colors.dark[5]}`
                        : '4px solid #222428',
                  }}
                  onClick={() => setSelectedComment(comment)}
                >
                  <Text weight={600}>{comment.name}</Text>
                  <Text size="sm" pt={5} color={theme.colors.gray[6]}>
                    {dayjs(Number(comment.created_at)).fromNow()}
                    <strong> · </strong>
                    {dayjs(Number(comment.created_at)).format(
                      'YYYY/MM/DD h:mm A'
                    )}
                  </Text>

                  <Text mt={5} sx={{ whiteSpace: 'pre-wrap' }}>
                    {comment.message}
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
              total={Math.trunc((currentComments.length - 1) / perPage) + 1}
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
    </div>
  )
}

export default AdminEntryList
