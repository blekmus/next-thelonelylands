import type { GetStaticProps, NextPage } from 'next'
import Archive from '../components/archive.component'
import Head from 'next/head'
import Banner from '../public/images/archive-banner.webp'
import { ArticleEntry, getAllArticles } from '../lib/content'


interface Props {
  entries: ArticleEntry[]
}

const ArchivePage: NextPage<Props> = ({ entries }) => {
  return (
    <>
      <Head>
        <title>Archive | The Lonely Lands</title>
        <meta name="robots" content="all" />

        <meta property="og:title" content="Archive | The Lonely Lands" />
        <meta property="twitter:title" content="Archive | The Lonely Lands" />
        <meta name="title" content="Archive | The Lonely Lands" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Lonely Lands" />

        <meta property="og:url" content="https://thelonelylands.com/archive" />
        <meta
          property="twitter:url"
          content="https://thelonelylands.com/archive"
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
      <Archive entries={entries} />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { entries: getAllArticles() },
  }
}

export default ArchivePage
