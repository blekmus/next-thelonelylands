import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import Image from 'next/image'
import mediaQuery from '../lib/mediaQuery'
import { Box, Text, Container } from '@mantine/core'
// import { useEffect, useState } from 'react'
// import { useSpring, animated, config } from 'react-spring'
import { IconBrandGithub } from '@tabler/icons'

const styles = {
  base: css({
    height: '100vh',
  }),

  header: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    maxWidth: '1500px',
    margin: 'auto',
    width: '80%',
    height: '100vh',
    alignItems: 'center',
    top: 0,
    right: 0,
    left: 0,

    [mediaQuery[2]]: {
      display: 'flex',
      width: '90%',
      flexDirection: 'column',
      alignItems: 'start',
      paddingTop: '150px',
      marginBottom: '50px',
    },
  }),

  title: css({
    fontSize: '35px',
    marginBottom: '15px',
  }),

  description: css({
    lineHeight: 1.6,
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
  }),

  content: css({
    position: 'absolute',
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    left: 0,
    right: 0,

    [mediaQuery[1]]: {
      maxWidth: '740px',
      padding: '14px',
    },
  }),
}

const Home: NextPage = () => {
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

  return (
    <div css={styles.base}>
      {/* onMouseMove={() => changeMouse()} */}
      {/* <animated.div style={stylesMenuAnimation}>
        <TopBar />
      </animated.div> */}
      <TopBar />
      <div css={styles.header}>
        <div css={styles.picture}>
          <Image
            src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/b695637-QyHl3bkGf3ow.png"
            alt="profile"
            width="300px"
            height="300px"
            layout="responsive"
            css={styles.profile_pic}
          />
        </div>

        <div>
          <h1 css={styles.title}>Sup</h1>

          <p css={styles.description}>
            I go by many names;
            <br />
            <strong>blekmus</strong>, <strong>walker</strong> or as my birth
            certificate states it, <strong>Dinil Fernando</strong>
            <br />
            <br />
            This site is a collection of thoughts I&apos;ve written down over
            the years You can find everything I&apos;ve written on anilist here.
            Don&apos;t worry it isn&apos;t updated manually :D
            <br />
            <br />
            Have fun reading my philosophy induced ramblings!
          </p>

          <div css={styles.social}>
            <a
              href="https://github.com/blekmus"
              target="_blank"
              rel="noreferrer"
              title="Github"
              style={{ display: 'contents' }}
            >
              <IconBrandGithub size={31} />
            </a>

            <a
              href="https://anilist.co/user/blekmus"
              target="_blank"
              rel="noreferrer"
              title="Anilist"
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
          </div>
        </div>
      </div>

      <div css={styles.content}>
        <Text weight={700}>Recent Posts</Text>
      </div>
    </div>
  )
}

export default Home
