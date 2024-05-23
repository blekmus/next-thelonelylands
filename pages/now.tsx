import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../public/images/otaku-banner.webp'
import Now from '../components/now.component'

const NowPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Now | The Lonely Lands</title>
        <meta name="robots" content="all" />

        <meta property="og:title" content="Now | The Lonely Lands" />
        <meta property="twitter:title" content="Now | The Lonely Lands" />
        <meta name="title" content="Now | The Lonely Lands" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Lonely Lands" />

        <meta property="og:url" content="https://thelonelylands.com" />
        <meta property="twitter:url" content="https://thelonelylands.com" />

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
      <Now />
    </>
  )
}

export default NowPage
