import type { NextPage } from 'next'
import Auth from '../components/auth.component'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Center, Loader } from '@mantine/core'

const Admin: NextPage = () => {
  const router = useRouter()

  const { status } = useSession()

  
  if (status === 'authenticated') {
    router.push('/admin/dashboard')
  }

  if (status === 'unauthenticated') {
    return <Auth />
  }

  return (
    <Center sx={{ height: '100vh' }}>
      <Loader color="gray" size="sm" />
    </Center>
  )
}

export default Admin
