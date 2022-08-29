import type { GetServerSideProps, NextPage } from 'next'
import Archive from '../components/archive.component'
import client from '../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import prisma from '../lib/prisma'
import Head from 'next/head'


interface Entry {
  id: string
  title: string
  created_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
}

interface Props {
  entries: Entry[]
}

const ArchivePage: NextPage<Props> = ({ entries }) => {
  return (
    <>
      <Head>
        <title>Archive | The Lonely Lands</title>
        <meta name="robots" content="all" />
        <meta
          name="description"
          content="Archive of all posts on The Lonely Lands"
        />
      </Head>
      <ApolloProvider client={client}>
        <Archive entries={entries} />
      </ApolloProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const entries = await prisma.entry.findMany({
      select: {
        id: true,
        title: true,
        created_at: true,
        type: true,
      },
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return {
      props: { entries: entries },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default ArchivePage
