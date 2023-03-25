import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import Image from 'next/image'
import mediaQuery from '../lib/mediaQuery'
import Article from './article.component'
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
  cover_type: 'FILE' | 'LINK'
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
            src="https://avatars.githubusercontent.com/u/47277246"
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
              <a style={{ borderBottom: 'solid var(--light-text) 1px' }}>
                <strong>Archive</strong>
              </a>
            </Link>{' '}
            to find links to all of my posts. Have fun reading my
            philosophy-induced ramblings!
            <br />
            <br />
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

            <a
              href="https://stats.fm/blekmus/"
              target="_blank"
              rel="noreferrer"
              title="Spotify: dinilfrod"
              style={{ display: 'contents' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 17"
                style={{ width: '29px' }}
                fill="currentcolor"
              >
                <path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm3.67 11.548a.499.499 0 0 1-.696.122c-1.875-1.318-4.994-1.391-7.1-.9a.5.5 0 0 1-.226-.975c2.315-.536 5.775-.438 7.9 1.057a.5.5 0 0 1 .122.696zm.976-1.951a.5.5 0 0 1-.698.114C9.773 8.15 7.101 7.762 3.535 8.49a.5.5 0 1 1-.201-.98c3.857-.787 6.779-.347 9.197 1.388a.502.502 0 0 1 .115.699zm.986-2.62a.5.5 0 0 1-.695.133c-2.757-1.871-6.948-1.88-9.661-.92a.5.5 0 1 1-.333-.944C5.894 4.203 10.467 4.225 13.5 6.282a.502.502 0 0 1 .132.695z" />
              </svg>
            </a>
            {/* <a
              href="https://discordid.netlify.app/?id=534321754517143553"
              target="_blank"
              rel="noreferrer"
              title="Discord: Walker#6140"
              style={{ display: 'contents' }}
            >
              <svg
                height="30px"
                version="1.1"
                fill="currentcolor"
                viewBox="0 0 157.728 157.731"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M78.864,0c43.556,0,78.863,35.308,78.863,78.864c0,43.552-35.308,78.868-78.863,78.868   C35.308,157.731,0,122.416,0,78.864C0,35.308,35.308,0,78.864,0z"
                    fill="inherit"
                  />
                  <path
                    d="M113.101,53.34c0,0-9.76-7.635-21.284-8.514l-1.043,2.076c10.425,2.552,15.2,6.207,20.199,10.695   c-8.612-4.394-17.112-8.514-31.927-8.514c-14.815,0-23.322,4.12-31.926,8.514c4.985-4.488,10.677-8.545,20.192-10.695l-1.036-2.076   c-12.099,1.145-21.284,8.514-21.284,8.514S34.09,69.143,32.221,100.166c10.985,12.672,27.669,12.771,27.669,12.771l3.487-4.649   c-5.923-2.059-12.61-5.741-18.386-12.378c6.889,5.209,17.293,10.642,34.055,10.642c16.762,0,27.158-5.426,34.055-10.642   c-5.783,6.637-12.47,10.319-18.386,12.378l3.487,4.649c0,0,16.677-0.099,27.669-12.771C123.995,69.143,113.101,53.34,113.101,53.34   z M65.211,91.651c-4.117,0-7.449-3.809-7.449-8.514c0-4.701,3.333-8.513,7.449-8.513c4.117,0,7.45,3.812,7.45,8.513   C72.661,87.843,69.328,91.651,65.211,91.651z M92.881,91.651c-4.117,0-7.45-3.809-7.45-8.514c0-4.701,3.333-8.513,7.45-8.513   c4.116,0,7.449,3.812,7.449,8.513C100.33,87.843,96.99,91.651,92.881,91.651z"
                    fill="#1a1b1e"
                  />
                </g>
              </svg>
            </a> */}
            <a
              href="https://www.goodreads.com/user/show/82237673-blekmus"
              target="_blank"
              rel="noreferrer"
              title="Goodreads: blekmus"
              style={{ display: 'contents' }}
            >
              <svg
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
              >
                <circle
                  cx="256"
                  cy="256"
                  fill="currentcolor"
                  id="ellipse"
                  r="256"
                />
                <path
                  d="M348.7,306.4V101.1H314v32.2h-0.5c-6.6-12.5-15.8-21.7-27.6-28.1c-12-6.1-24.8-9.2-39.1-9.2  c-19.4,0-35.5,3.6-48.8,11c-13.3,7.4-24,16.9-32.2,28.1c-8.2,11.5-13.8,24.3-17.4,38.3c-3.3,14.1-5.1,27.6-5.1,40.9  c0,15.3,2,29.9,6.1,43.5c4.3,13.8,10.5,25.8,18.9,36c8.4,10.2,18.9,18.4,31.2,24.5c12.5,6.1,27.1,9.2,44,9.2  c14.3,0,28.1-3.3,40.9-10c12.8-6.4,22.5-16.6,28.9-30.4h0.8V302c0,12.3-1.3,23.8-3.6,34.3c-2.6,10.2-6.6,19.2-12,26.6  c-5.4,7.4-12.5,13-20.7,17.4c-8.4,4.1-18.7,6.1-30.9,6.1c-6.1,0-12.3-0.5-18.9-1.8c-6.6-1.3-12.8-3.6-18.7-6.4  c-5.6-2.8-10.2-6.6-14.1-11.2c-4.1-4.6-6.1-10.2-6.4-16.9h-36.8c0.5,12,3.6,22.2,9.5,30.7c5.9,8.4,13,15.3,22,20.4  c8.7,5.1,18.7,8.9,29.4,11.2c10.7,2.3,21.5,3.6,31.9,3.6c35.8,0,62.1-9.2,78.7-27.3C340.3,370.5,348.7,342.9,348.7,306.4  L348.7,306.4z M245.5,295.4c-12,0-22.2-2.6-30.4-7.7c-7.9-4.9-14.6-11.5-19.4-19.9c-4.9-8.2-8.4-17.4-10.5-27.3  c-2.1-10.2-3.1-20.2-3.1-30.4c0-10.7,1.3-21,3.8-30.7c2.3-10,6.4-18.7,11.8-26.1c5.4-7.7,12-13.5,20.5-18.1  c8.4-4.3,18.7-6.6,30.4-6.6c11.5,0,21.5,2.3,29.4,6.9c8.2,4.6,14.8,10.7,19.7,18.4c5.1,7.7,8.9,16.4,11.2,25.8  c2.3,9.7,3.3,19.2,3.3,29.1c0,10.5-1.3,20.7-3.6,31.2c-2.6,10.5-6.4,19.7-11.5,27.9c-5.1,8.4-12,15.1-20.7,19.9  C268,292.8,257.7,295.4,245.5,295.4L245.5,295.4z"
                  fill="#1a1b1e"
                  id="logo"
                />
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
                cover_type={entry.cover_type}
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
