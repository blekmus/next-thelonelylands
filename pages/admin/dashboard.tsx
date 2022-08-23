import { Center, Loader } from '@mantine/core'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminBase from '../../components/admin.base.component'
import AdminDashboard from '../../components/admin.dashboard.component'

const AdminDashboardPage: NextPage = () => {
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
          <title>Dashboard (Admin) - The Lonely Lands</title>
        </Head>

        <AdminBase content="dashboard">
          <AdminDashboard />
        </AdminBase>
      </>
    )
  }

  return (
    <Center sx={{ height: '100vh' }}>
      <Loader color="gray" size="sm" />
    </Center>
  )
}

export default AdminDashboardPage
