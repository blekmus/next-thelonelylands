import type { NextPage } from 'next'
import Otaku from '../components/otaku.component'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/anilist-client'
import Head from 'next/head'


const OtakuPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Otaku | The Lonely Lands</title>
        <meta
          name="description"
          content="A collection of thoughts I've written about anime, manga and light novels"
        />

        <meta name="robots" content="all" />
      </Head>
      <ApolloProvider client={client}>
        <Otaku />
      </ApolloProvider>
    </>
  )
}

export default OtakuPage
