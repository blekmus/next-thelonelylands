import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import mediaQuery from '../lib/mediaQuery'
import { Divider } from '@mantine/core'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import HomeAccordian from './home.accordian.component'
import Link from 'next/link'
import { IconArrowsMaximize } from '@tabler/icons'
import Markdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { ArticleEntry } from '../lib/content'

dayjs.extend(relativeTime)

interface Props {
  entry: ArticleEntry
  recentEntries: ArticleEntry[]
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
    },
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

    p: {
      margin: '20px 0',
    },

    [mediaQuery[0]]: {
      fontSize: '15px',
      lineHeight: 1.5,
    },
  }),

  readnext_cont: css({
    marginTop: '50px',
  }),

  readnext_card_header: css({
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: '10px',
  }),

  readnext_text: css({
    marginBottom: '30px',
    fontWeight: 700,
  }),

  readnext_card: css({
    marginBottom: '15px',
    background: 'var(--foreground)',
    borderRadius: '8px',
    padding: '18px 24px 17px 24px',
    width: '100%',
    display: 'block',

    [mediaQuery[1]]: {
      marginBottom: '14px',
      padding: '14px 14px 10px 14px',
    },

    ':hover svg': {
      opacity: 1,
    },

    ':hover h2': {
      textDecoration: 'underline',
    },

    h2: {
      fontWeight: 700,
      fontSize: '22px',

      [mediaQuery[0]]: {
        fontSize: '19px',
      },
    },

    p: {
      margin: '0 0 8px 0',
      color: 'var(--dark-text)',
      fontSize: '14px',
      lineHeight: 1.6,
      overflow: 'hidden',
      WebkitLineClamp: '2',
      display: '-webkit-box',
      MozBoxOrient: 'vertical',
      whiteSpace: 'normal',
      WebkitBoxOrient: 'vertical',
    },
  }),

  readnext_card_title_icon: css({
    opacity: 0,
    transition: 'opacity 0.2s linear',
    color: 'var(--light-text)',
  }),
}

const Post: NextPage<Props> = ({ entry, recentEntries }) => {
  const coverSrc =
    entry.cover_type === 'FILE' && entry.cover && !entry.cover.startsWith('/')
      ? `https://caiden-thelonelylands.s3.eu-central-003.backblazeb2.com/${entry.cover}`
      : entry.cover

  return (
    <div css={styles.base}>
      <TopBar />

      <div css={styles.post}>
        {entry.cover ? (
          <figure css={styles.cover}>
            <div css={styles.cover_overlay}></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              css={styles.cover_image}
              src={coverSrc}
              alt={entry.coverAlt || 'cover-image'}
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
            {
              entry.notes.split(' ').filter((item) => item.trim() !== '').length
            }{' '}
            Words
          </p>
        </header>

        <div css={styles.content}>
          <Markdown remarkPlugins={[remarkBreaks]}>{entry.notes}</Markdown>
        </div>

        <Divider variant="dashed" />

        <div css={styles.readnext_cont}>
          <p css={styles.readnext_text} style={{ textAlign: 'center' }}>
            Read Next
          </p>
          <div>
            {recentEntries.map((item) => (
              (<Link
                href={`/post/${item.slug}`}
                passHref
                key={item.id}
                css={styles.readnext_card}
                title={item.title}
                target="_self"
                rel="noopener noreferrer">

                <div css={styles.readnext_card_header}>
                  <h2>{item.title}</h2>
                  <IconArrowsMaximize
                    css={styles.readnext_card_title_icon}
                    size={20}
                  />
                </div>
                <p>
                  {item.excerpt.length > 400
                    ? `${item.excerpt.substring(0, 400)}...`
                    : item.excerpt}
                </p>

              </Link>)
            ))}
          </div>
        </div>
      </div>

      <HomeAccordian />
    </div>
  );
}

export default Post
