import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminBase from '../../components/admin.base.component'
import AdminNew from '../../components/admin.new.component'
import client from '../../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import { Center, Loader } from '@mantine/core'

const AdminNewPage: NextPage = () => {
  const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/admin')
    },
  })

  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>New Entry (Admin) - The Lonely Lands</title>
        </Head>
        <ApolloProvider client={client}>
          <AdminBase content="new">
            <AdminNew />
          </AdminBase>
        </ApolloProvider>
      </>
    )
  }

  return (
    <Center sx={{ height: '100vh' }}>
      <Loader color="gray" size="sm" />
    </Center>
  )
}

export default AdminNewPage
