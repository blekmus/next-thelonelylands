import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import mediaQuery from '../lib/mediaQuery'
import { Divider } from '@mantine/core'

import HomeAccordian from './home.accordian.component'

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

    'h3': {
      fontFamily: 'Oxygen, sans-serif',
    },

    'h3, p': {
      marginBottom: '15px',
    },

    // every h3 followed by a p
    // 'h3:not(:last-child) + p': {
    //   marginBottom: '30px',
    // },

    // every p with a h3 after it
    'p + h3': {
      marginTop: '30px',
    },

    // all p with a p after it
    'p + p': {
      marginTop: '-10px',
    },

    'a': {
      borderBottom: 'solid var(--light-text) 1px',
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

const Now = () => {
  return (
    <div css={styles.base}>
      <TopBar />

      <div css={styles.post}>
        <header css={styles.header}>
          <h1 css={styles.header_title}>What I&apos;m doing Now</h1>
          <p css={styles.header_sub}>Written on 22 May, 2024</p>
        </header>

        <div css={styles.content}>
          <p>I&apos;m totally keeping this page up to date, hopefully...</p>
          <h3>Playing</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            I&apos;m playing Ghost of Tsushima on PS5, and it&apos;s one of the best games
            I&apos;ve ever played. The PS5 controller experience is incredible, far
            beyond my expectations. I&apos;m used to playing on PC with an Xbox
            Series X controller, but this is on another level.
          </p>

          <h3>Watching</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            I&apos;m watching the Monogatari series right now. I didn&apos;t like it much
            when I first tried it two years ago, but a certain{' '}
            <a href="https://youtu.be/p-yaen2_1TQ?si=jnbnpsYJXZ7SfJa8">
              <strong>video</strong>
            </a>{' '}
            made me want to give it another shot. I&apos;m currently halfway through
            the series (finished Tsuki) and I&apos;m really enjoying it
            this time around.
          </p>

          <h3>College</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            College is relatively easy as always. Though I&apos;m learning ASP.NET
            this semester, it follows a similar formula to frameworks like
            Laravel and Django, so there&apos;s nothing particularly new or fresh
            making it a breeze.
          </p>

          <h3>Learning</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            I&apos;m exploring C++ and the animation library GSAP in my free time.
            I&apos;ve never touched a language that lets me tinker and shoot myself
            in the foot as much as C++ does so it&apos;s a new experience. GSAP is
            fun, especially since my previous animations have been with CSS
            keyframes or dare I say Framer Motion. Framer never quite clicked
            for me, I think GSAP will be different.
          </p>
          <p>
            I&apos;m also studying for the AWS Solutions Architect exam again.
            Although starting with the Cloud Practitioner certification is
            recommended, I have enough AWS experience from my startup to take it
            on.
          </p>
        </div>

        <Divider variant="dashed" />
      </div>

      <HomeAccordian />
    </div>
  )
}

export default Now
