import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminBase from '../../../components/admin.base.component'
import AdminEdit from '../../../components/admin.edit.component'
import client from '../../../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import { Center, Loader } from '@mantine/core'

const AdminEditPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/admin')
    },
  })

  if (!id || typeof id !== 'string') {
    router.push('/admin/dashboard')
    return
  }

  if (status === 'authenticated') {
    return (
      <ApolloProvider client={client}>
        <AdminBase content="edit">
          <AdminEdit id={id} />
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

export default AdminEditPage
