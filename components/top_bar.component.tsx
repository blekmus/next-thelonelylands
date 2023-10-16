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
      borderBottom: 'solid var(--light-text) 1px !important',
    },
  }),
}

interface Props {
  page?: string
}

const TopBar: NextPage<Props> = ({ page }) => {
  return (
    <header css={styles.base}>
      <div css={styles.title}>
        <h2>
          <Link href="/">
            The Lonely Lands
          </Link>
        </h2>
      </div>

      <nav css={styles.menu}>
        <p>
          <Link
            href="/writer"
            style={{
              borderBottom:
                page === 'writer' ? 'solid var(--light-text) 1px' : 'initial',
            }}>
            
              Writer
            
          </Link>
        </p>

        <p>
          <Link
            href="/cinephile"
            style={{
              borderBottom:
                page === 'cinephile'
                  ? 'solid var(--light-text) 1px'
                  : 'initial',
            }}>
            
              Cinephile
            
          </Link>
        </p>

        <p>
          <Link
            href="/otaku"
            style={{
              borderBottom:
                page === 'otaku' ? 'solid var(--light-text) 1px' : 'initial',
            }}>
            
              Otaku
            
          </Link>
        </p>

        <p>
          <Link
            href="/archive"
            style={{
              borderBottom:
                page === 'archive'
                  ? 'solid var(--light-text) 1px'
                  : 'initial',
            }}>
            
              Archive
            
          </Link>
        </p>
      </nav>
    </header>
  );
}

export default TopBar
