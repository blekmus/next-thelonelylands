import type { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/site-client'
import Writer from '../components/writer.component'
import Head from 'next/head'
import Banner from '../public/images/writer-banner.webp'


const WriterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Writer | The Lonely Lands</title>
        <meta name="robots" content="all" />

        <meta property="og:title" content="Writer | The Lonely Lands" />
        <meta property="twitter:title" content="Writer | The Lonely Lands" />
        <meta name="title" content="Writer | The Lonely Lands" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Lonely Lands" />

        <meta property="og:url" content="https://thelonelylands.com/writer" />
        <meta
          property="twitter:url"
          content="https://thelonelylands.com/writer"
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
        <Writer />
      </ApolloProvider>
    </>
  )
}

export default WriterPage
