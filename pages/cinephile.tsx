import type { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/site-client'
import Cinephile from '../components/cinephile.component'
import Head from 'next/head'
import Banner from '../public/images/cinephile-banner.webp'


const CinephilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cinephile | The Lonely Lands</title>
        <meta name="robots" content="all" />

        <meta property="og:title" content="Cinephile | The Lonely Lands" />
        <meta property="twitter:title" content="Cinephile | The Lonely Lands" />
        <meta name="title" content="Cinephile | The Lonely Lands" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Lonely Lands" />

        <meta
          property="og:url"
          content="https://thelonelylands.com/cinephile"
        />
        <meta
          property="twitter:url"
          content="https://thelonelylands.com/cinephile"
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
        <Cinephile />
      </ApolloProvider>
    </>
  )
}

export default CinephilePage
