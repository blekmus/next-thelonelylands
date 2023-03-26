import type { GetServerSideProps, NextPage } from 'next'
import Home from '../components/home.component'
import client from '../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import prisma from '../lib/prisma'
import Banner from '../public/images/home-banner.jpg'

interface Entry {
  id: string
  title: string
  notes: string
  cover: string
  cover_type: 'FILE' | 'LINK'
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
  status: 'PUBLISHED' | 'DRAFT'
}

interface Props {
  entries: Entry[]
}

const HomePage: NextPage<Props> = ({ entries }) => {
  return (
    <>
      <Head>
        <title>The Lonely Lands</title>
        <meta name="robots" content="all" />
        <meta name="title" content="The Lonely Lands" />
        <meta
          name="description"
          content="The Lonely Lands is a collection of thoughts, musings, and memories written down over the years by Dinil Fernando (aka. blekmus/walker)"
        />

        <meta property="og:site_name" content="The Lonely Lands" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thelonelylands.com" />
        <meta property="og:title" content="The Lonely Lands" />
        <meta
          property="og:description"
          content="The Lonely Lands is a collection of thoughts, musings, and memories written down over the years by Dinil Fernando (aka. blekmus/walker)"
        />
        <meta
          property="og:image"
          content={`https://thelonelylands.com${Banner.src}`}
        />
        <meta
          property="twitter:image"
          content={`https://thelonelylands.com${Banner.src}`}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://thelonelylands.com" />
        <meta property="twitter:title" content="The Lonely Lands" />
        <meta
          property="twitter:description"
          content="The Lonely Lands is a collection of thoughts, musings, and memories written down over the years by Dinil Fernando (aka. blekmus/walker)"
        />
      </Head>
      <ApolloProvider client={client}>
        <Home entries={entries} />
      </ApolloProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const entries = await prisma.entry.findMany({
      skip: 0,
      take: 5,
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
  } catch (e) {
    return {
      notFound: true
    }
  }
}

export default HomePage
