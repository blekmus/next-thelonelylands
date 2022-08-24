import type { NextPage } from 'next'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import Link from 'next/link'

interface Entry {
  id: string
  title: string
  created_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
}

interface Props {
  entries: Entry[]
}

interface AlphabeticalEntries {
  letter: string
  entries: Entry[]
}

const styles = {
  archive_posts: css({
    width: '100%',
    fontSize: '16px',
  }),

  archive_entry: css({
    padding: '5px',
    margin: '10px 0',
    display: 'block',

    h3: {
      fontFamily: 'Oxygen, sans-serif',
      margin: '5px 0 0 0',
      fontWeight: '400',
    },

    p: {
      color: 'var(--dark-text)',
      fontSize: '14px',
      lineHeight: 1.3,
    },
  }),

  archive_letter: css({
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px 0',
    ':not(:last-of-type)': {
      borderBottom: '2px solid rgb(51, 51, 51)',
    },
  }),

  archive_letter_header: css({
    fontFamily: 'Oxygen, sans-serif',
    margin: '25px 0',
    width: '200px',
  }),
}

const ArchiveAlphabetical: NextPage<Props> = ({ entries }) => {
  // make an array of entries grouped alphabetically
  let filtered = entries.reduce<AlphabeticalEntries[]>((acc, entry) => {
    const letter = entry.title.charAt(0).toUpperCase()
    const letterObj = acc.find((obj) => obj.letter === letter)
    if (letterObj) {
      letterObj.entries.push(entry)
    } else {
      acc.push({ letter, entries: [entry] })
    }
    return acc
  }, [])

  // sort filtered by letter and title
  filtered = filtered.sort((a, b) => {
    if (a.letter < b.letter) {
      return -1
    } else if (a.letter > b.letter) return 1
    else {
      if (a.entries[0].title < b.entries[0].title) {
        return -1
      } else if (a.entries[0].title > b.entries[0].title) {
        return 1
      } else {
        return 0
      }
    }
  })

  // sort filtered by entries in each letter
  const alphabeticalEntries = (filtered = filtered
    .map((letterObj) => {
      letterObj.entries = letterObj.entries.sort((a, b) => {
        if (a.title < b.title) {
          return -1
        } else if (a.title > b.title) {
          return 1
        } else {
          return 0
        }
      })
      return letterObj
    })
    .sort((a, b) => {
      if (a.letter < b.letter) {
        return -1
      } else if (a.letter > b.letter) return 1
      else {
        return 0
      }
    }))

  return (
    <div>
      {alphabeticalEntries.map((letter) => (
        <div key={letter.letter} css={styles.archive_letter}>
          <h3 css={styles.archive_letter_header}>{letter.letter}</h3>
          <div css={styles.archive_posts}>
            {letter.entries.map((entry) => (
              <Link key={entry.id} href={`/post/${entry.id}`}>
                <a css={styles.archive_entry} href={`/post/${entry.id}`}>
                  <h3>{entry.title}</h3>
                  <p>
                    {dayjs(Number(entry.created_at)).format('D MMMM, YYYY')}
                    <strong> · </strong>
                    {entry.type.charAt(0) + entry.type.slice(1).toLowerCase()}
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

export default ArchiveAlphabetical
