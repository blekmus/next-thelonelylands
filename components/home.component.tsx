import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import Image from 'next/image'
import mediaQuery from '../lib/mediaQuery'
import Article from './article.component'
import AnilistPfp from '../public/images/anilist_pfp.png'
import HomeContact from './home.contact.component'
import HomeLinks from './home.links.component'
import HomeAccordian from './home.accordian.component'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Entry {
  id: string
  title: string
  notes: string
  cover: string
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
  status: 'PUBLISHED' | 'DRAFT'
}

interface Props {
  entries: Entry[]
}

const styles = {
  base: css({
    backgroundColor: 'var(--background)',
  }),

  header: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    maxWidth: '1500px',
    margin: 'auto',
    width: '80%',
    height: '100vh',
    alignItems: 'center',

    [mediaQuery[2]]: {
      display: 'flex',
      width: '90%',
      flexDirection: 'column',
      alignItems: 'start',
      paddingTop: '50px',
      height: 'auto',
      marginBottom: '70px',
    },
  }),

  title: css({
    fontSize: '35px',
    marginBottom: '30px',

    [mediaQuery[0]]: {
      fontSize: '30px',
      textAlign: 'center',
    },
  }),

  description: css({
    lineHeight: 1.6,

    [mediaQuery[0]]: {
      fontSize: '15px',
      lineHeight: 1.5,
    },
  }),

  picture: css({
    justifySelf: 'right',
    marginRight: '80px',
    width: '300px',
    heigh: '300px',

    [mediaQuery[2]]: {
      margin: '0 0 10px 0',
      width: '150px',
      heigh: '150px',
    },

    [mediaQuery[0]]: {
      margin: '0 auto 5px auto',
    },
  }),

  profile_pic: css({
    borderRadius: 15,

    [mediaQuery[2]]: {
      borderRadius: '10px',
    },
  }),

  social: css({
    display: 'flex',
    columnGap: '10px',
    marginTop: '15px',

    [mediaQuery[0]]: {
      justifyContent: 'center',
      marginTop: '30px',
      columnGap: '20px',
    },
  }),

  content: css({
    marginBottom: '80px',

    [mediaQuery[0]]: {
      marginBottom: '70px',
    },
  }),

  content_recent: css({
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
    },
  }),

  content_text: css({
    marginBottom: '30px',
    fontWeight: 700,

    [mediaQuery[2]]: {
      marginBottom: '20px',
    },
  }),
}

const Home: NextPage<Props> = ({ entries }) => {
  const [entryList, setEntryList] = useState<Entry[]>([])

  useEffect(() => {
    setEntryList(entries)
  }, [entries])

  return (
    <div css={styles.base}>
      <TopBar />

      <div css={styles.header}>
        <div css={styles.picture}>
          <Image
            src={AnilistPfp}
            alt="profile"
            width="300px"
            height="300px"
            layout="responsive"
            css={styles.profile_pic}
            priority
          />
        </div>

        <div>
          <h1 css={styles.title}>Sup</h1>

          <p css={styles.description}>
            I go by many names;
            <br />
            <strong>blekmus</strong>, <strong>walker</strong> or as my birth
            certificate reads, <strong>Dinil Fernando</strong>
            <br />
            <br />
            This site is a collection of thoughts, musings, and memories that
            I&apos;ve written down over the years. I hope you enjoy reading them
            as much as I enjoyed writing them.
            <br />
            <br />
            Visit the{' '}
            <Link href="/archive">
              <a
                style={{ borderBottom: 'solid var(--light-text) 1px' }}
              >
                <strong>Archive</strong>
              </a>
            </Link>{' '}
            to find all of my previous posts.
            <br />
            <br />
            Have fun reading my philosophy-induced ramblings and thanks for
            stopping by!
          </p>

          <div css={styles.social}>
            <a
              href="https://github.com/blekmus"
              target="_blank"
              rel="noreferrer"
              title="Github: blekmus"
              style={{ display: 'contents' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                style={{ width: '28px' }}
                fill="currentcolor"
              >
                <path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z" />
              </svg>
            </a>

            <a
              href="https://anilist.co/user/blekmus"
              target="_blank"
              rel="noreferrer"
              title="Anilist: blekmus"
              style={{ display: 'contents' }}
            >
              <svg
                viewBox="0 0 39 29"
                style={{ width: '32px' }}
                fill="currentcolor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.2945 21.5933V1.7636C26.2945.627171 25.6677.0 24.5312.0H20.6514c-1.1364.0-1.7636.627171-1.7636 1.7636.0.0.0 4.32855.0 9.4172.0.2652 2.5554 1.4966 2.6221 1.7571C23.4567 20.5448 21.9329 26.633 20.0873 26.9172 23.105 27.0665 23.4369 28.5173 21.1892 27.526 21.5331 23.4672 22.8748 23.4751 26.732 27.3767 26.7651 27.4103 27.5229 29 27.5701 29c4.3367.0 9.1098.0 9.1098.0C37.8163 29 38.4432 28.3731 38.4432 27.2367V23.3569C38.4432 22.2204 37.8163 21.5933 36.6799 21.5933H26.2945z"
                  fillOpacity=".61"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1891.0.0 29H7.91626l1.7243-5.0162H18.262L19.9473 29h7.877L17.6742.0H10.1891zm1.2541 17.5568L13.912 9.52293l2.7041 8.03387H11.4432z"
                ></path>
              </svg>
            </a>

            <a
              href="https://trakt.tv/users/blekmus"
              target="_blank"
              rel="noreferrer"
              title="Trakt: blekmus"
              style={{ display: 'contents' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '29px' }}
                fill="currentcolor"
                viewBox="0 0 24 24"
              >
                <path d="M19.178 18.464c1.541-1.71 2.484-3.99 2.484-6.466 0-3.885-2.287-7.215-5.568-8.76l-6.089 6.076L19.178 18.464zM12.348 11.071v-.008l-.678-.676 4.788-4.79.679.689L12.348 11.071zM16.211 3.806l.677.682-5.517 5.517-.68-.679L16.211 3.806zM4.89 18.531c1.756 1.92 4.294 3.113 7.11 3.113 1.439 0 2.801-.313 4.027-.876l-6.697-6.68L4.89 18.531z" />
                <path d="M12,24c6.615,0,12-5.385,12-12S18.615,0,12,0S0,5.385,0,12S5.385,24,12,24z M12,1.211c5.95,0,10.79,4.839,10.79,10.789S17.95,22.79,12,22.79S1.211,17.95,1.211,12S6.05,1.211,12,1.211z" />
                <path d="M4.276,17.801l5.056-5.055l0.359,0.329l7.245,7.245c0.15-0.082,0.285-0.164,0.42-0.266L9.33,12.05l-4.854,4.855l-0.679-0.679l5.535-5.535l0.359,0.331l8.46,8.437c0.135-0.1,0.255-0.215,0.375-0.316L9.39,10.027l-0.083,0.015l-0.006-0.007L4.227,15.09l-0.679-0.68L15.115,2.849C14.137,2.521,13.095,2.34,12,2.34C6.663,2.337,2.337,6.663,2.337,12C2.337,14.172,3.05,16.178,4.276,17.801z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <HomeLinks />

      <div css={styles.content}>
        <div css={styles.content_recent}>
          <p css={styles.content_text}>Recent Posts</p>
          <div>
            {entryList.map((entry) => (
              <Article
                key={entry.id}
                cover={entry.cover}
                title={entry.title}
                notes={entry.notes}
                link={entry.id}
                date={Number(entry.created_at)}
                type={
                  entry.type.charAt(0) + entry.type.toLocaleLowerCase().slice(1)
                }
              />
            ))}
          </div>
        </div>
      </div>

      <HomeContact />

      <HomeAccordian />
    </div>
  )
}

export default Home

// const [mouseMoving, setMouseMoving] = useState(false)

// const [stylesMenuAnimation, setMenuAnimation] = useSpring(() => ({ opacity: 0, y: 0, config: config.gentle }))

// let timeout: ReturnType<typeof setTimeout>
// const changeMouse = () => {
//   clearTimeout(timeout)
//   timeout = setTimeout(() => setMouseMoving(false), 500)

//   if (!mouseMoving) {
//     // when the state is set here, the timeout created above is orphaned
//     // the clearTimeout run in the next function run doesn't work on it
//     // so the timeout has to be cleared beforehand
//     // this causes a false to appear every two second because the first timeout isn't cleared
//     clearTimeout(timeout)
//     setMouseMoving(true)
//   }
// }

// useEffect(() => {
//   if (mouseMoving) {
//     setMenuAnimation({ opacity: 1, y: 0 })
//   } else {
//     setMenuAnimation({ opacity: 0 })
//   }
// }, [mouseMoving, setMenu  // content: css({
// Animation])

// return (
//   <div css={styles.base}>
// {/* onMouseMove={() => changeMouse()} */}
// {/* <animated.div style={stylesMenuAnimation}>
//   <TopBar />
// </animated.div> */}
