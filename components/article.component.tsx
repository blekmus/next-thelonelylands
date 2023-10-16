import type { NextPage } from 'next'
import { css } from '@emotion/react'
import mediaQuery from '../lib/mediaQuery'
import { useRef } from 'react'

import dayjs from 'dayjs'
import Link from 'next/link'
import { IconArrowsMaximize, } from '@tabler/icons'


interface Props {
  title: string
  notes: string
  note_words?: number | null
  date?: Date | number | null | string
  type?: string | null
  cover?: string
  cover_type?: 'FILE' | 'LINK',
  link?: string
  link_target?: string
}

const styles = {
  entry: css({
    position: 'relative',
    marginBottom: '24px',
    background: 'var(--foreground)',
    borderRadius: '8px',
    padding: '24px 24px 20px 24px',

    '&.active': {
      '.entry-content': {
        color: 'var(--light-text)',
        WebkitLineClamp: 'initial',
        whiteSpace: 'pre-wrap',
      },

      '.entry-cover-img': {
        filter: 'grayscale(0%)',
        transform: 'scale(1.03)',
      },
    },

    [mediaQuery[1]]: {
      marginBottom: '14px',
      padding: '14px 14px 10px 14px',
    },
  }),

  entry_cover: css({
    marginBottom: '15px',
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    maxHeight: '250px',
    borderRadius: '8px',
    overflow: 'hidden',

    [mediaQuery[0]]: {
      maxHeight: '100px',
    },

    [mediaQuery[1]]: {
      marginBottom: '14px',
      maxHeight: '170px',
    },
  }),

  entry_cover_img: css({
    borderRadius: '8px',
    pointerEvents: 'none',
    width: '100%',
    height: 'auto',
    maxHeight: '250px',
    objectFit: 'cover',
    filter: 'grayscale(100%)',
    transition: 'all 0.8s cubic-bezier(.22,.61,.36,1)',
  }),

  entry_title: css({
    fontWeight: 700,

    [mediaQuery[0]]: {
      fontSize: '13px',
    },
  }),

  entry_title_link: css({
    display: 'inline-flex',
    fontWeight: 700,
    alignItems: 'center',
    columnGap: '10px',

    a: {
      position: 'relative',
      zIndex: 2,
    },

    'a:hover': {
      textDecoration: 'underline',
    },

    'a:hover + svg': {
      opacity: 1,
    },

    [mediaQuery[0]]: {
      fontSize: '13px',
    },
  }),

  entry_title_icon: css({
    opacity: 0,
    transition: 'opacity 0.2s linear',
    color: 'var(--light-text)',
  }),

  entry_content: css({
    margin: '8px 0',
    color: 'var(--dark-text)',
    fontSize: '14px',
    lineHeight: 1.6,
    overflow: 'hidden',
    WebkitLineClamp: '2',
    display: '-webkit-box',
    MozBoxOrient: 'vertical',
    whiteSpace: 'normal',
    WebkitBoxOrient: 'vertical',
  }),

  entry_footer: css({
    display: 'flex',
    justifyContent: 'space-between',
    color: 'var(--dark-text)',
    fontSize: '13px',
  }),

  entry_overlay: css({
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    cursor: 'pointer',
    zIndex: 1,
  }),
}

const Article: NextPage<Props> = ({
  cover,
  cover_type,
  title,
  notes,
  note_words,
  date,
  type,
  link,
  link_target
}) => {
  let coverSection
  const entryEl = useRef<HTMLDivElement>(null)


  const handleEntryClick = () => {
    if (entryEl.current?.classList.contains('active')) {
      entryEl.current.classList.remove('active')
    } else {
      entryEl.current?.classList.add('active')
    }
  }

  // cover section
  if (cover) {
    coverSection = (
      <figure css={styles.entry_cover}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            cover_type === 'FILE'
              ? `https://caiden-thelonelylands.s3.eu-central-003.backblazeb2.com/${cover}`
              : cover
          }
          alt="cover"
          css={styles.entry_cover_img}
          loading="lazy"
          className="entry-cover-img"
        />
      </figure>
    )
  }

  // header section
  const headerSection = link ? (
    <header css={styles.entry_title_link}>
      <Link
        href={`/post/${link}`}
        passHref
        title="Fullpage"
        target={link_target || '_self'}
        rel="noopener noreferrer">

        <h2>{title}</h2>

      </Link>
      <IconArrowsMaximize css={styles.entry_title_icon} size={20} />
    </header>
  ) : (
    <header css={styles.entry_title}>
      <h2>{title}</h2>
    </header>
  )

  // content section
  const contentSection = (
    <div className="entry-content" css={styles.entry_content}>
      <p>{notes}</p>
    </div>
  )

  // footer section
  const footerSection = (
    <footer css={styles.entry_footer}>
      <p>
        {note_words && <>{note_words} words</>}{' '}
        {date && (
          <>
            {note_words && <strong>·</strong>}{' '}
            {dayjs(Number(date)).format('D MMMM, YYYY')}
          </>
        )}{' '}
        {type && (
          <>
            {(note_words || date) && <strong>·</strong>} {type}
          </>
        )}
      </p>
    </footer>
  )

  return (
    <article css={styles.entry} ref={entryEl}>
      <div css={styles.entry_overlay} onClick={handleEntryClick} />

      {coverSection}
      {headerSection}
      {contentSection}
      {footerSection}
    </article>
  )
}

export default Article
