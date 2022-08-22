import type { NextPage } from 'next'
import Auth from '../components/auth.component'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Admin: NextPage = () => {
  const router = useRouter()

  const { status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === 'authenticated') {
    router.push('/admin/dashboard')
  }

  return <Auth />
}

export default Admin
