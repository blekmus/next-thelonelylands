import type { GetStaticProps, NextPage } from 'next'
import Cinephile from '../components/cinephile.component'
import Head from 'next/head'
import Banner from '../public/images/cinephile-banner.webp'
import { ArticleEntry, getAllArticles } from '../lib/content'

interface Props {
  entries: ArticleEntry[]
}

const CinephilePage: NextPage<Props> = ({ entries }) => {
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
      <Cinephile entries={entries} />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries = getAllArticles().filter((entry) =>
    ['MOVIE', 'SERIES'].includes(entry.type)
  )

  return {
    props: { entries },
  }
}

export default CinephilePage
