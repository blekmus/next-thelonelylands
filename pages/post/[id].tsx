import type { GetServerSideProps, NextPage } from 'next'
import Post from '../../components/post.component'
import client from '../../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import prisma from '../../lib/prisma'

interface Entry {
  id: string
  title: string
  notes: string
  cover: string
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'SHORT' | 'ESSAY' | 'STORY' | 'OTHER'
  status: 'PUBLISHED' | 'DRAFT'
}

interface Props {
  entry: Entry
}

const PostPage: NextPage<Props> = ({ entry }) => {
  return (
    <ApolloProvider client={client}>
      <Post entry={entry} />
    </ApolloProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id

  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    }
  }

  try {
    const entry = await prisma.entry.findFirstOrThrow({
      where: {
        id: id,
      },
    })

    return {
      props: { entry: entry },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default PostPage
