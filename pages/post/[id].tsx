import type { GetServerSideProps, NextPage } from 'next'
import Post from '../../components/post.component'
import client from '../../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import prisma from '../../lib/prisma'
import Head from 'next/head'

interface Entry {
  id: string
  title: string
  notes: string
  cover: string
  cover_type: 'LINK' | 'FILE'
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
  status: 'PUBLISHED' | 'DRAFT'
}

interface Props {
  entry: Entry
  recentEntries: Entry[]
}

const PostPage: NextPage<Props> = ({ entry, recentEntries }) => {
  return (
    <>
      <Head>
        <title>{entry.title} | The Lonely Lands</title>
        <meta name="robots" content="all" />

        <meta name="title" content={`${entry.title} | The Lonely Lands`} />
        <meta
          name="description"
          content={
            entry.notes.length > 100
              ? `${entry.notes.substring(0, 100)}...`
              : entry.notes
          }
        />

        <meta property="og:site_name" content="The Lonely Lands" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://thelonelylands.com/post/${entry.id}`}
        />
        <meta
          property="og:title"
          content={`${entry.title} | The Lonely Lands`}
        />
        <meta
          property="og:description"
          content={
            entry.notes.length > 200
              ? `${entry.notes.substring(0, 200)}...`
              : entry.notes
          }
        />
        <meta
          property="og:image"
          content={
            entry.notes.length > 200
              ? `${entry.notes.substring(0, 200)}...`
              : entry.notes
          }
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://thelonelylands.com/post/${entry.id}`}
        />
        <meta
          property="twitter:title"
          content={`${entry.title} | The Lonely Lands`}
        />
        <meta
          property="twitter:description"
          content={
            entry.notes.length > 200
              ? `${entry.notes.substring(0, 200)}...`
              : entry.notes
          }
        />
        <meta
          property="twitter:image"
          content={
            entry.cover_type === 'FILE'
              ? `https://caiden-thelonelylands.s3.eu-central-003.backblazeb2.com/${entry.cover}`
              : entry.cover
          }
        />
      </Head>
      <ApolloProvider client={client}>
        <Post entry={entry} recentEntries={recentEntries} />
      </ApolloProvider>
    </>
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
        status: "PUBLISHED",
      },
    })

    // get the two entries published after the current one, if there aren't any get one's publish before
    const recentEntries = await prisma.entry.findMany({
      where: {
        id: {
          not: id,
        },
        status: "PUBLISHED",
        created_at: {
          gt: entry.created_at,
        },
      },
      orderBy: {
        created_at: "asc",
      },
      take: 2,
    })

    if (recentEntries.length < 2) {
      const recentEntries2 = await prisma.entry.findMany({
        where: {
          id: {
            not: id,
          },
          status: "PUBLISHED",
          created_at: {
            lt: entry.created_at,
          },
        },
        orderBy: {
          created_at: "desc",
        },
        take: 2 - recentEntries.length,
      })

      recentEntries.push(...recentEntries2)

      recentEntries.sort((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      })
    }

    return {
      props: {
        entry: entry,
        recentEntries: recentEntries,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default PostPage
