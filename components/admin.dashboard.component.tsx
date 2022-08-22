import {
  Group,
  Header,
  Container,
  createStyles,
  Title,
  Text,
  Box,
  Center,
  Card,
} from '@mantine/core'
import { useRouter } from 'next/router'

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
}))

const AdminDashboard = () => {
  const router = useRouter()

  const { classes } = useStyles()

  return (
    <div style={{ minHeight: '100%' }}>
      <Header height={60} className={classes.topbar}>
        <Container className={classes.topbar_header} size={2000}>
          <Group>
            <Title order={3}>Dashboard</Title>
          </Group>
        </Container>
      </Header>

      <Box p={30}>
        <Group>
          <Card
            p="xl"
            sx={{ cursor: 'pointer', width: 200 }}
            onClick={() => router.push('/admin/new')}
          >
            <Center>
              <Text weight={600} size="lg" p="xl">
                New Entry
              </Text>
            </Center>
          </Card>

          <Card
            p="xl"
            sx={{ cursor: 'pointer', width: 200 }}
            onClick={() => router.push('/admin/entries')}
          >
            <Center>
              <Text weight={700} size="lg" p="xl">
                Entries
              </Text>
            </Center>
          </Card>
        </Group>
      </Box>
    </div>
  )
}

export default AdminDashboard
