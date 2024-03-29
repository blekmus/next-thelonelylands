import type { NextPage } from 'next'
import { css } from '@emotion/react'
import mediaQuery from '../lib/mediaQuery'
import { useEffect, useState } from 'react'

import ArchiveChronological from './archive.chronological.component'
import TopBar from './top_bar.component'
import ArchiveAlphabetical from './archive.alphabetical.component'
import ArchiveCategorical from './archive.categorical.component'


interface Entry {
  id: string
  title: string
  created_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
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

    [mediaQuery[2]]: {
      paddingTop: '30px',
    },

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
      paddingTop: '40px',
    },
  }),

  header: css({
    marginBottom: '40px',

    [mediaQuery[0]]: { marginBottom: '30px' },
  }),

  header_title: css({
    fontSize: '35px',
    marginBottom: '2px',
    lineHeight: 1.2,
    fontWeight: 700,

    [mediaQuery[0]]: {
      fontSize: '32px',
    },
  }),

  header_title_sub: css({
    color: 'var(--dark-text)',

    [mediaQuery[0]]: {
      fontSize: '14px',
    },
  }),

  content_menu: css({
    marginBottom: '40px',

    [mediaQuery[2]]: {
      display: 'flex',
      columnGap: '10px',
      flexWrap: 'wrap',
    },

    [mediaQuery[0]]: {
      columnGap: '0',
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
    marginRight: '10px',

    [mediaQuery[2]]: {
      margin: 0,
    },

    [mediaQuery[0]]: {
      padding: '9px 9px 11px 9px',
      fontSize: '14px',
    },
  }),

  content_menu_btn_active: css({
    background: 'var(--foreground)',
  }),

  content: css({}),
}


const Archive: NextPage<Props> = ({ entries }) => {
  const [type, setType] = useState<'ALPHA' | 'CHRONO' | 'CATE'>('CHRONO')

  const [entryList, setEntryList] = useState<Entry[]>([])

  useEffect(() => {
    setEntryList(entries)
  }, [entries])

  return (
    <div css={styles.base}>
      <TopBar page="archive" />

      <div css={styles.cont}>
        <header css={styles.header}>
          <h1 css={styles.header_title}>Archive</h1>
          <p css={styles.header_title_sub}>
            Features sorted links to all of my works except for everything Otaku
          </p>
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
          {type === 'ALPHA' && <ArchiveAlphabetical entries={entryList} />}
          {type === 'CHRONO' && <ArchiveChronological entries={entryList} />}
          {type === 'CATE' && <ArchiveCategorical entries={entryList} />}
        </div>
      </div>
    </div>
  )
}

export default Archive
