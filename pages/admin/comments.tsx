import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminBase from '../../components/admin.base.component'
import AdminComments from '../../components/admin.comments.component'
import client from '../../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import { Box, Center, Loader } from '@mantine/core'

const AdminCommentsPage: NextPage = () => {
  const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/admin')
    },
  })

  if (status === 'loading') {
    return (
      <Center sx={{ height: '100vh' }}>
        <Loader color="gray" size="sm" />
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>Comments (Admin) - The Lonely Lands</title>
      </Head>

      <ApolloProvider client={client}>
        <AdminBase content="comments">
          <AdminComments />
        </AdminBase>
      </ApolloProvider>
    </>
  )
}

export default AdminCommentsPage
