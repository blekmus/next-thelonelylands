import type { NextPage } from 'next'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import Link from 'next/link'


interface Entry {
  id: string
  title: string
  created_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'SHORT' | 'ESSAY' | 'STORY' | 'OTHER'
}
interface ChronologicalEntries {
  year: number
  months: Month[]
}
interface Month {
  month: number
  entries: Entry[]
}
interface Props {
  entries: Entry[]
}

const styles = {
  archive_year: css({
    ':not(:last-of-type)': {
      borderBottom: '2px solid rgb(51, 51, 51)',
    },
  }),

  archive_year_header: css({
    fontFamily: 'Oxygen, sans-serif',
    fontSize: '28px',
  }),

  archive_month: css({
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px 0',
  }),

  archive_month_header: css({
    fontFamily: 'Oxygen, sans-serif',
    margin: '25px 0',
    width: '200px',
  }),

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
}


const ArchiveChronological: NextPage<Props> = ({ entries }) => {
  // make an array of entries grouped by year and month
  const filtered = entries.reduce<ChronologicalEntries[]>((acc, entry) => {
    const year = dayjs(Number(entry.created_at)).year()
    const month = dayjs(Number(entry.created_at)).month()

    const monthObj = acc.find((obj) => obj.year === year)
    if (monthObj) {
      const monthEntry = monthObj.months.find((obj) => obj.month === month)
      if (monthEntry) {
        monthEntry.entries.push(entry)
      } else {
        monthObj.months.push({ month, entries: [entry] })
      }
    } else {
      acc.push({ year, months: [{ month, entries: [entry] }] })
    }
    return acc
  }, [])

  // sort filtered by year and month and day
  const chronoEntries = filtered
    .sort((a, b) => {
      if (a.year < b.year) {
        return -1
      } else if (a.year > b.year) return 1
      else {
        if (a.months[0].month < b.months[0].month) {
          return -1
        } else if (a.months[0].month > b.months[0].month) {
          return 1
        } else {
          if (
            dayjs(Number(a.months[0].entries[0].created_at)).date() <
            dayjs(Number(b.months[0].entries[0].created_at)).date()
          )
            return -1
          if (
            dayjs(Number(a.months[0].entries[0].created_at)).date() >
            dayjs(Number(b.months[0].entries[0].created_at)).date()
          )
            return 1
          return 0
        }
      }
    })
    .reverse()

  return (
    <div>
      {chronoEntries.map((year) => (
        <div key={year.year} css={styles.archive_year}>
          <h2 css={styles.archive_year_header}>{year.year}</h2>
          {year.months.map((month) => (
            <div key={month.month} css={styles.archive_month}>
              <h3 css={styles.archive_month_header}>
                {dayjs().month(month.month).format('MMMM')}
              </h3>
              <div css={styles.archive_posts}>
                {month.entries.map((entry) => (
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
      ))}
    </div>
  )
}


export default ArchiveChronological
