import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Post from '../../components/post.component'
import Head from 'next/head'
import {
  ArticleEntry,
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
} from '../../lib/content'

interface Props {
  entry: ArticleEntry
  recentEntries: ArticleEntry[]
}

const PostPage: NextPage<Props> = ({ entry, recentEntries }) => {
  const description =
    entry.excerpt.length > 200 ? `${entry.excerpt.substring(0, 200)}...` : entry.excerpt
  const image =
    entry.cover && entry.cover.startsWith('/')
      ? `https://thelonelylands.com${entry.cover}`
      : entry.cover

  return (
    <>
      <Head>
        <title>{entry.title} | The Lonely Lands</title>
        <meta name="robots" content="all" />

        <meta name="title" content={`${entry.title} | The Lonely Lands`} />
        <meta
          name="description"
          content={description}
        />

        <meta property="og:site_name" content="The Lonely Lands" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://thelonelylands.com/post/${entry.slug}`}
        />
        <meta
          property="og:title"
          content={`${entry.title} | The Lonely Lands`}
        />
        <meta
          property="og:description"
          content={description}
        />
        {image && <meta property="og:image" content={image} />}

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://thelonelylands.com/post/${entry.slug}`}
        />
        <meta
          property="twitter:title"
          content={`${entry.title} | The Lonely Lands`}
        />
        <meta
          property="twitter:description"
          content={description}
        />
        {image && <meta property="twitter:image" content={image} />}
      </Head>
      <Post entry={entry} recentEntries={recentEntries} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllArticles().map((entry) => ({
      params: { id: entry.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.id

  if (!slug || Array.isArray(slug)) {
    return {
      notFound: true,
    }
  }

  const entry = getArticleBySlug(slug)

  if (!entry) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      entry,
      recentEntries: getAdjacentArticles(slug),
    },
  }
}

export default PostPage
