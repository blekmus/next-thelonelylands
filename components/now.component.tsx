import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import mediaQuery from '../lib/mediaQuery'
import { Divider } from '@mantine/core'
import HomeAccordian from './home.accordian.component'
import { NowEntry } from '../pages/now'
import Markdown from 'react-markdown'
import dayjs from 'dayjs'

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

    h3: {
      fontFamily: 'Oxygen, sans-serif',
    },

    'h3, p': {
      marginBottom: '15px',
    },

    // every p with a h3 after it
    'p + h3': {
      marginTop: '30px',
    },

    // all p with a p after it
    'p + p': {
      marginTop: '0px',
    },

    a: {
      borderBottom: 'solid var(--light-text) 1px',
      fontWeight: 600,
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

const Now = ({now} : {now: NowEntry}) => {
  return (
    <div css={styles.base}>
      <TopBar />

      <div css={styles.post}>
        <header css={styles.header}>
          <h1 css={styles.header_title}>Now</h1>
          <p css={styles.header_sub}>
            Updated {dayjs(Number(now.created_at)).format('D MMMM, YYYY')} from{' '}
            {now.location}
          </p>
        </header>

        <div css={styles.content}>
          <Markdown>{now.content}</Markdown>
        </div>

        <Divider variant="dashed" />
      </div>

      <HomeAccordian />
    </div>
  )
}

export default Now
