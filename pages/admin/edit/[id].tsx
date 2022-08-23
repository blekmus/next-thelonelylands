import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminBase from '../../../components/admin.base.component'
import AdminEdit from '../../../components/admin.edit.component'
import client from '../../../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import { Center, Loader } from '@mantine/core'

interface Props {
  id: string
}

const AdminEditPage: NextPage<Props> = ({id}) => {
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id

  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      id: id
    },
  }
}


export default AdminEditPage
