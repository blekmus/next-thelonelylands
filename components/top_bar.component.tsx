import type { NextPage } from 'next'
import Link from 'next/link'
import { css } from '@emotion/react'
import mediaQuery from '../lib/mediaQuery'

const styles = {
  base: css({
    maxWidth: '1500px',
    margin: 'auto',
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: 3.5,
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,

    [mediaQuery[2]]: {
      position: 'relative',
    },

    [mediaQuery[1]]: {
      flexDirection: 'column',
    },
  }),

  title: css({
    'a:hover': {
      borderBottom: 'solid var(--light-text) 1px',
    },
  }),

  menu: css({
    display: 'flex',
    columnGap: '50px',
    fontWeight: 'bold',
    color: 'var(--light-text)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: '15px',

    [mediaQuery[1]]: {
      columnGap: '25px',
      lineHeight: 1,
    },

    'a:hover': {
      borderBottom: 'solid var(--light-text) 1px',
    },
  }),
}

const TopBar: NextPage = () => {
  return (
    <header css={styles.base}>
      <div css={styles.title}>
        <h2>
          <Link href="/">
            <a>The Lonely Lands</a>
          </Link>
        </h2>
      </div>

      <nav css={styles.menu}>
        <p>
          <Link href="/writer">
            <a>Writer</a>
          </Link>
        </p>

        <p>
          <Link href="/enthusiast">
            <a>Enthusiast</a>
          </Link>
        </p>

        <p>
          <Link href="/cinephile">
            <a>Cinephile</a>
          </Link>
        </p>

        <p>
          <Link href="/otaku">
            <a>Otaku</a>
          </Link>
        </p>

        <p>
          <Link href="/archive">
            <a>Archive</a>
          </Link>
        </p>
      </nav>
    </header>
  )
}

export default TopBar
