import type { GetServerSideProps, NextPage } from 'next'
import Archive from '../components/archive.component'
import client from '../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import prisma from '../lib/prisma'
import Head from 'next/head'
import Banner from '../public/images/archive-banner.webp'


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

        <meta property="og:title" content="Archive | The Lonely Lands" />
        <meta property="twitter:title" content="Archive | The Lonely Lands" />
        <meta name="title" content="Archive | The Lonely Lands" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Lonely Lands" />

        <meta property="og:url" content="https://thelonelylands.com/archive" />
        <meta
          property="twitter:url"
          content="https://thelonelylands.com/archive"
        />

        <meta
          property="og:image"
          content={`https://thelonelylands.com${Banner.src}`}
        />
        <meta
          property="twitter:image"
          content={`https://thelonelylands.com${Banner.src}`}
        />

        <meta
          property="og:description"
          content="The Lonely Lands is a collection of thoughts, musings, and memories written down over the years by Dinil Fernando (aka. blekmus/walker)"
        />
        <meta
          name="description"
          content="The Lonely Lands is a collection of thoughts, musings, and memories written down over the years by Dinil Fernando (aka. blekmus/walker)"
        />
        <meta
          property="twitter:description"
          content="The Lonely Lands is a collection of thoughts, musings, and memories written down over the years by Dinil Fernando (aka. blekmus/walker)"
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
