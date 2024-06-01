import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminBase from '../../components/admin.base.component'
import client from '../../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import { Center, Loader } from '@mantine/core'
import AdminNow from '../../components/admin.now.component'

interface Props {
  id: string
}

const AdminNowPage: NextPage<Props> = () => {
  const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/admin')
    },
  })

  if (status === 'authenticated') {
    return (
      <ApolloProvider client={client}>
        <AdminBase content="now">
          <AdminNow />
        </AdminBase>
      </ApolloProvider>
    )
  }

  return (
    <Center sx={{ height: '100vh' }}>
      <Loader color="gray" size="sm" />
    </Center>
  )
}


export default AdminNowPage
