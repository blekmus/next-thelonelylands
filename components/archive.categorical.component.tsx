import type { NextPage } from 'next'
import { css } from '@emotion/react'

import dayjs from 'dayjs'
import Link from 'next/link'
import mediaQuery from '../lib/mediaQuery'


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
  archive_type: css({
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px 0',
    ':not(:last-of-type)': {
      borderBottom: '2px solid rgb(51, 51, 51)',
    },

    [mediaQuery[0]]: {
      paddingBottom: '20px',
      marginTop: '10px',
    },
  }),

  archive_type_header: css({
    fontFamily: 'Oxygen, sans-serif',
    margin: '25px 0',
    width: '200px',

    [mediaQuery[0]]: {
      width: '160px',
      fontSize: '15px',
      margin: '15px 0',
    },
  }),

  archive_posts: css({
    width: '100%',
    fontSize: '16px',
  }),

  archive_entry: css({
    padding: '5px',
    margin: '10px 0',
    display: 'block',

    [mediaQuery[0]]: {
      margin: '5px 0',
    },

    h3: {
      fontFamily: 'Oxygen, sans-serif',
      margin: '5px 0 0 0',
      fontWeight: '400',

      [mediaQuery[0]]: {
        fontSize: '15px',
        lineHeight: 1.4,
      },
    },

    p: {
      color: 'var(--dark-text)',
      fontSize: '14px',
      lineHeight: 1.3,

      [mediaQuery[0]]: {
        fontSize: '12px',
      },
    },
  }),
}


interface CategoricalEntries {
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
  entries: Entry[]

}

const ArchiveCategorical: NextPage<Props> = ({ entries }) => {
  // make an array of entries grouped by type
  const filtered = entries.reduce<CategoricalEntries[]>((acc, entry) => {
    const type = entry.type
    const typeObj = acc.find((obj) => obj.type === type)
    if (typeObj) {
      typeObj.entries.push(entry)
    } else {
      acc.push({ type, entries: [entry] })
    }
    return acc
  }, [])

  // sort filtered by type and title
  const categoricalEntries = filtered.sort((a, b) => {
    if (a.type < b.type) {
      return -1
    } else if (a.type > b.type) return 1
    else {
      if (a.entries[0].title < b.entries[0].title) {
        return -1
      } else if (a.entries[0].title > b.entries[0].title) {
        return 1
      } else {
        return 0
      }
    }
  }).map((entry) => ({
    type: entry.type,
    entries: entry.entries.sort((a, b) => {
      if (a.title < b.title) {
        return -1
      } else if (a.title > b.title) return 1
      else {
        return 0
      }
    }),
  }))

  return (
    <div>
      {categoricalEntries.map((entry) => (
        <div key={entry.type} css={styles.archive_type}>
          <h3 css={styles.archive_type_header}>
            {entry.type.charAt(0) + entry.type.slice(1).toLowerCase()}
          </h3>
          <div css={styles.archive_posts}>
            {entry.entries.map((entry) => (
              <Link key={entry.id} href={`/post/${entry.id}`}>
                <a css={styles.archive_entry} href={`/post/${entry.id}`}>
                  <h3>{entry.title}</h3>
                  <p>
                    {dayjs(Number(entry.created_at)).format('D MMMM, YYYY')}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArchiveCategorical

