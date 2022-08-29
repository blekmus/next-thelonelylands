import type { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/site-client'
import Cinephile from '../components/cinephile.component'
import Head from 'next/head'

const CinephilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cinephile | The Lonely Lands</title>
        <meta
          name="description"
          content="A collection of thoughts I've written about movies and series"
        />
        <meta name="robots" content="all" />
      </Head>
      <ApolloProvider client={client}>
        <Cinephile />
      </ApolloProvider>
    </>
  )
}

export default CinephilePage
