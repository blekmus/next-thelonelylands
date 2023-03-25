import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import mediaQuery from '../lib/mediaQuery'
import { Divider } from '@mantine/core'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import HomeAccordian from './home.accordian.component'
import Head from 'next/head'

dayjs.extend(relativeTime)

interface Entry {
  id: string
  title: string
  notes: string
  cover: string
  cover_type: 'FILE' | 'LINK'
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
  status: 'PUBLISHED' | 'DRAFT'
}

interface Props {
  entry: Entry
}

const styles = {
  base: css({
    backgroundColor: 'var(--background)',
  }),

  post: css({
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    paddingTop: '110px',
    marginBottom: '50px',
    minHeight: 'calc(100vh - 265px)',

    [mediaQuery[2]]: {
      paddingTop: '30px',
    },

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
      paddingTop: '40px',
    },
  }),

  cover: css({
    position: 'relative',
    marginBottom: '30px',

    [mediaQuery[0]]: {
      marginBottom: '20px',
    },
  }),

  cover_overlay: css({
    boxShadow: '0 -50px 100px var(--background)inset',
    width: '100%',
    height: '100%',
    position: 'absolute',
  }),

  cover_image: css({
    borderRadius: '8px',
    maxHeight: '350px',
    width: '100%',
    objectFit: 'cover',
  }),

  header: css({
    marginBottom: '40px',

    [mediaQuery[0]]: {
      marginBottom: '20px',
    }
  }),

  header_title: css({
    fontSize: '40px',
    marginBottom: '2px',
    lineHeight: 1.2,
    fontWeight: 700,

    [mediaQuery[0]]: {
      fontSize: '30px',
      marginBottom: '5px',
    },
  }),

  header_sub: css({
    fontSize: '14px',
    color: 'var(--dark-text)',
  }),

  header_type: css({
    background: 'var(--foreground)',
    padding: '2px 5px',
    borderRadius: '5px',
    marginRight: '5px',
    color: 'var(--light-text)',
  }),

  content: css({
    lineHeight: 1.6,
    fontSize: '17px',
    marginBottom: '80px',

    [mediaQuery[0]]: {
      fontSize: '15px',
      lineHeight: 1.5,
    },
  }),
}

const Post: NextPage<Props> = ({ entry }) => {
  return (
    <>
      <Head>
        <title>{entry.title} | The Lonely Lands</title>
        <meta name="robots" content="all" />
      </Head>
      <div css={styles.base}>
        <TopBar />

        <div css={styles.post}>
          {entry.cover ? (
            <figure css={styles.cover}>
              <div css={styles.cover_overlay}></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                css={styles.cover_image}
                src={
                  entry.cover_type === 'FILE'
                    ? `/images/uploads/${entry.cover}`
                    : entry.cover
                }
                alt="cover-image"
              />
            </figure>
          ) : (
            ''
          )}

          <header css={styles.header}>
            <h1 css={styles.header_title}>{entry.title}</h1>
            <p css={styles.header_sub}>
              <span css={styles.header_type}>
                {entry.type.charAt(0) + entry.type.toLocaleLowerCase().slice(1)}
              </span>{' '}
              Published {dayjs(Number(entry.created_at)).format('D MMM, YYYY')}
              <strong> · </strong>
              Updated {dayjs(Number(entry.updated_at)).format('D MMM, YYYY')}
              <strong> · </strong>
              {
                entry.notes.split(' ').filter((item) => item.trim() !== '')
                  .length
              }{' '}
              Words
            </p>
          </header>

          <div css={styles.content}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{entry?.notes}</p>
          </div>

          <Divider variant="dashed" />
        </div>

        <HomeAccordian />
      </div>
    </>
  )
}

export default Post


