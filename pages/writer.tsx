import type { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/site-client'
import Writer from '../components/writer.component'
import Head from 'next/head'

const WriterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Writer | The Lonely Lands</title>
        <meta
          name="description"
          content="A collection of essays, poems and stories I've written over the years"
        />
        <meta name="robots" content="all" />
      </Head>
      <ApolloProvider client={client}>
        <Writer />
      </ApolloProvider>
    </>
  )
}

export default WriterPage
