import type { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/site-client'
import Enthusiast from '../components/enthusiast.component'
import Head from 'next/head'

const EnthusiastPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Enthusiast - The Lonely Lands</title>
      </Head>
      <ApolloProvider client={client}>
        <Enthusiast />
      </ApolloProvider>
    </>
  )
}

export default EnthusiastPage
