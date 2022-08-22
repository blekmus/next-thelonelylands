import type { NextPage } from 'next'
import { css } from '@emotion/react'
import mediaQuery from '../lib/mediaQuery'
import Head from 'next/head'
import { useState } from 'react'

import ArchiveChronological from './archive.chronological.component'
import TopBar from './top_bar.component'
import ArchiveAlphabetical from './archive.alphabetical.component'
import ArchiveCategorical from './archive.categorical.component'


interface Entry {
  id: string
  title: string
  created_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'SHORT' | 'ESSAY' | 'STORY' | 'OTHER'
}

interface Props {
  entries: Entry[]
}

const styles = {
  base: css({
    backgroundColor: 'var(--background)',
  }),

  cont: css({
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    paddingTop: '110px',
    marginBottom: '50px',
    minHeight: 'calc(100vh - 265px)',

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
      paddingTop: '140px',
    },
  }),

  header: css({
    marginBottom: '20px',

    [mediaQuery[0]]: { marginBottom: '10px' },
  }),

  header_title: css({
    fontSize: '40px',
    marginBottom: '2px',
    lineHeight: 1.2,
    fontWeight: 700,

    [mediaQuery[0]]: {
      fontSize: '32px',
    },
  }),

  content_menu: css({
    marginBottom: '40px',

    [mediaQuery[2]]: {
      display: 'flex',
      columnGap: '10px',
    },
  }),

  content_menu_btn: css({
    padding: '9px 17px 11px 17px',
    borderRadius: '6px',
    color: 'var(--light-text)',
    cursor: 'pointer',
    background: 'none',
    fontWeight: 600,
    fontSize: '16px',

    [mediaQuery[2]]: {
      margin: 0,
    },
  }),

  content_menu_btn_active: css({
    background: 'var(--foreground)',
  }),

  content: css({}),
}


const Archive: NextPage<Props> = ({ entries }) => {
  const [type, setType] = useState<'ALPHA' | 'CHRONO' | 'CATE'>('CHRONO')

  return (
    <>
      <Head>
        <title>Archive - The Lonely Lands</title>
      </Head>

      <div css={styles.base}>
        <TopBar />

        <div css={styles.cont}>
          <header css={styles.header}>
            <h1 css={styles.header_title}>Archive</h1>
          </header>

          <nav css={styles.content_menu}>
            <button
              css={[
                styles.content_menu_btn,
                type === 'CHRONO' ? styles.content_menu_btn_active : null,
              ]}
              onClick={() => setType('CHRONO')}
            >
              <p>Chronological</p>
            </button>
            <button
              css={[
                styles.content_menu_btn,
                type === 'ALPHA' ? styles.content_menu_btn_active : null,
              ]}
              onClick={() => setType('ALPHA')}
            >
              <p>Alphabetical</p>
            </button>

            <button
              css={[
                styles.content_menu_btn,
                type === 'CATE' ? styles.content_menu_btn_active : null,
              ]}
              onClick={() => setType('CATE')}
            >
              <p>Categorical</p>
            </button>
          </nav>

          <div css={styles.content}>
            {type === 'ALPHA' && <ArchiveAlphabetical entries={entries} />}
            {type === 'CHRONO' && <ArchiveChronological entries={entries} />}
            {type === 'CATE' && <ArchiveCategorical entries={entries} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Archive
