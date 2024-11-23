import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import Image from 'next/legacy/image'
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
            width={300}
            height={300}
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
            This site is a collection of thoughts, musings, and memories
            I&apos;ve written down over the years. Visit the{' '}
            <Link
              href="/archive"
              style={{ borderBottom: 'solid var(--light-text) 1px' }}
            >
              <strong>Archive</strong>
            </Link>{' '}
            to find links to all of my posts.
            <br />
            <br />
            What am I up to now?{' '}
            <Link
              href="/now"
              style={{ borderBottom: 'solid var(--light-text) 1px' }}
            >
              <strong>Find out.</strong>
            </Link>{' '}
            <br />
            <br />
            Have fun reading my philosophy-induced ramblings!
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
                width="28"
                height="29"
                viewBox="0 0 49 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="24" fill="currentcolor" />
                <g clipPath="url(#clip0_617_7)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M31.9458 31.3379V10.8244C31.9458 9.6488 31.3512 9 30.2729 9H26.5921C25.514 9 24.9189 9.6488 24.9189 10.8244C24.9189 10.8244 24.9189 15.3022 24.9189 20.5663C24.9189 20.8407 27.3433 22.1146 27.4066 22.384C29.2535 30.2532 27.8079 36.5514 26.0569 36.8454C28.9199 36.9998 29.2348 38.5007 27.1023 37.4752C27.4286 33.2764 28.7015 33.2846 32.3609 37.3207C32.3923 37.3555 33.1112 39 33.156 39C37.2703 39 41.7986 39 41.7986 39C42.8768 39 43.4715 38.3515 43.4715 37.1759V33.1623C43.4715 31.9866 42.8768 31.3379 41.7986 31.3379H31.9458Z"
                    fill="#1a1b1e"
                    fillOpacity="0.81"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.6666 9L7 39H14.5103L16.1462 33.8108H24.3255L25.9244 39H33.3974L23.7678 9H16.6666ZM17.8564 27.1622L20.1986 18.8513L22.764 27.1622H17.8564Z"
                    fill="#1a1b1e"
                  />
                </g>
              </svg>
            </a>

            <a
              href="https://letterboxd.com/blekmus"
              target="_blank"
              rel="noreferrer"
              title="Letterboxd: blekmus"
              style={{ display: 'contents' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
                viewBox="0 0 500 500"
                version="1.1"
              >
                <defs>
                  <rect
                    id="path-1"
                    x="0"
                    y="0"
                    width="129.847328"
                    height="141.443299"
                  />
                  <rect
                    id="path-3"
                    x="0"
                    y="0"
                    width="129.847328"
                    height="141.443299"
                  />
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <circle
                    id="Circle"
                    fill="currentcolor"
                    cx="250"
                    cy="250"
                    r="250"
                  />
                  <g id="Dots" transform="translate(61.000000, 180.000000)">
                    <ellipse
                      id="Green"
                      fill="#1a1b1e"
                      cx="189"
                      cy="70"
                      rx="70.0786517"
                      ry="70"
                    />
                    <g id="Blue" transform="translate(248.152672, 0.000000)">
                      <mask id="mask-2" fill="white">
                        <use xlinkHref="#path-1" />
                      </mask>
                      <g id="Mask" />
                      <ellipse
                        fill="#1a1b1e"
                        mask="url(#mask-2)"
                        cx="59.7686766"
                        cy="70"
                        rx="70.0786517"
                        ry="70"
                      />
                    </g>
                    <g id="Orange">
                      <mask id="mask-4" fill="white">
                        <use xlinkHref="#path-3" />
                      </mask>
                      <g id="Mask" />
                      <ellipse
                        fill="#1a1b1e"
                        mask="url(#mask-4)"
                        cx="70.0786517"
                        cy="70"
                        rx="70.0786517"
                        ry="70"
                      />
                    </g>
                    <path
                      d="M129.539326,107.063108 C122.810493,96.3149291 118.921348,83.611134 118.921348,70 C118.921348,56.388866 122.810493,43.6850709 129.539326,32.9368922 C136.268159,43.6850709 140.157303,56.388866 140.157303,70 C140.157303,83.611134 136.268159,96.3149291 129.539326,107.063108 L129.539326,107.063108 Z"
                      id="Overlap"
                      fill="currentcolor"
                    />
                    <path
                      d="M248.460674,32.9368922 C255.189507,43.6850709 259.078652,56.388866 259.078652,70 C259.078652,83.611134 255.189507,96.3149291 248.460674,107.063108 C241.731841,96.3149291 237.842697,83.611134 237.842697,70 C237.842697,56.388866 241.731841,43.6850709 248.460674,32.9368922 L248.460674,32.9368922 Z"
                      id="Overlap"
                      fill="currentcolor"
                    />
                  </g>
                </g>
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
          <p css={styles.content_text}>Recent</p>
          <div>
            {entryList.map((entry) => (
              <Article
                key={entry.id}
                cover={entry.cover}
                cover_type={entry.cover_type}
                title={entry.title}
                notes={entry.notes}
                link={entry.id}
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
