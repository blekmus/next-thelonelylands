import type { GetStaticProps, NextPage } from 'next'
import Home from '../components/home.component'
import Head from 'next/head'
import Banner from '../public/images/home-banner.jpg'
import { ArticleEntry, getAllArticles } from '../lib/content'

interface Props {
  entries: ArticleEntry[]
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
      <Home entries={entries} />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries = getAllArticles().slice(0, 5)

  return {
    props: { entries },
  }
}

export default HomePage
