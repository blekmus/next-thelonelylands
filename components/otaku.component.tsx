import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import mediaQuery from '../lib/mediaQuery'
import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'
import Article from './article.component'
import AnilistFilter from '../lib/anilist-filter'
import queries from '../lib/anilist-query'
import { Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'

interface Entry {
  title: string
  notes: string
  note_words: number
  id: string
  cover: string
  date: Date | undefined
}

const styles = {
  base: css({
    backgroundColor: 'var(--background)',
  }),

  header: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    minHeight: '70vh',

    [mediaQuery[2]]: {
      width: '90%',
      minHeight: 'initial',
      flexDirection: 'column',
      alignItems: 'start',
      paddingTop: '60px',
      marginBottom: '70px',
      height: 'auto',
      paddingLeft: '0',
      paddingRight: '0',
      justifyContent: 'flex-start',
    },
  }),

  title: css({
    fontSize: '35px',
    marginBottom: '15px',

    [mediaQuery[0]]: {
      fontSize: '30px',
    },
  }),

  description: css({
    lineHeight: 1.6,

    [mediaQuery[0]]: {
      fontSize: '15px',
      lineHeight: 1.5,
    },
  }),

  content_menu: css({
    marginBottom: '30px',

    [mediaQuery[2]]: {
      display: 'flex',
      justifyContent: 'center',
      columnGap: '10px',
      flexWrap: 'wrap',
    },

    [mediaQuery[0]]: {
      columnGap: '5px',
    },
  }),

  content_menu_btn: css({
    padding: '9px 17px 11px 17px',
    marginRight: '20px',
    borderRadius: '6px',
    color: 'var(--light-text)',
    cursor: 'pointer',
    background: 'none',
    fontWeight: 600,
    fontSize: '16px',

    [mediaQuery[2]]: {
      margin: 0,
    },

    [mediaQuery[0]]: {
      padding: '9px 13px 11px 13px',
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
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    marginBottom: '40px',

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
    },
  }),

  content_menu_btn_active: css({
    background: 'var(--foreground)',
  }),

  entry_list: css({}),

  link_text: css({
    marginBottom: '50px',
    fontWeight: 700,
    textAlign: 'center',
    marginTop: '30px',
  }),
}

const Otaku: NextPage = () => {
  const [format, setFormat] = useState('anime')

  const totalEntries = {
    anime: 0,
    manga: 0,
    reviews: 0,
  }

  const totalWords = {
    anime: 0,
    manga: 0,
    reviews: 0,
  }


  const [animeData, setAnimeData] = useState<Entry[]>([])
  const [mangaData, setMangaData] = useState<Entry[]>([])
  const [reviewData, setReviewData] = useState<Entry[]>([])
  const [currentData, setCurrentData] = useState<Entry[]>([])

  const [getManga] = useLazyQuery(queries.MANGAQUERY, {
    onCompleted: (data) => {
      const filteredData = AnilistFilter.filterMangaData(data)
      setMangaData(filteredData)

      const words = filteredData.reduce((acc, entry) => {
        acc = acc + entry.note_words
        return acc
      }, 0)

      totalWords.manga = words
      totalEntries.manga = filteredData.length
    },
    onError: () => {
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to load entries
          </Text>
        ),
        color: 'red',
        icon: <IconX />,
      })

    },
  })

  const [getReviews] = useLazyQuery(queries.REVIEWQUERY, {
    onCompleted: (data) => {
      const filteredData = AnilistFilter.filterReviewData(data)
      setReviewData(filteredData)

      const words = filteredData.reduce((acc, entry) => {
        acc = acc + entry.note_words
        return acc
      }, 0)

      totalWords.reviews = words
      totalEntries.reviews = filteredData.length
      },
    onError: () => {
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to load entries
          </Text>
        ),
        color: 'red',
        icon: <IconX />,
      })
    },
  })

  useQuery(queries.ANIMEQUERY, {
    onCompleted: (data) => {
      const filteredData = AnilistFilter.filterAnimeData(data)
      setAnimeData(filteredData)

      const words = filteredData.reduce((acc, entry) => {
        acc = acc + entry.note_words
        return acc
      }, 0)

      totalWords.anime = words
      totalEntries.anime = filteredData.length

      getManga()
      getReviews()
    },
    onError: () => {
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to load entries
          </Text>
        ),
        color: 'red',
        icon: <IconX />,
      })
    },
  })

  useEffect(() => {
    if (format === 'anime') {
      setCurrentData(animeData.slice(0, 5))
    }

    if (format === 'manga') {
      setCurrentData(mangaData.slice(0, 5))
    }

    if (format === 'reviews') {
      setCurrentData(reviewData.slice(0, 5))
    }
  }, [format, animeData, mangaData, reviewData])

  const loadMore = () => {
    if (format === 'anime') {
      setCurrentData(animeData.slice(0, currentData.length + 5))
    }

    if (format === 'manga') {
      setCurrentData(mangaData.slice(0, currentData.length + 5))
    }

    if (format === 'reviews') {
      setCurrentData(reviewData.slice(0, currentData.length + 5))
    }
  }

  return (
    <div css={styles.base}>
      <TopBar />

      <div css={styles.header}>
        <div>
          <h1 css={styles.title}>Otaku</h1>

          <p css={styles.description}>
            Japanese Anime, Manga and Light Novels have become a cornerstone in
            my life. I didn&apos;t always feel this way, though. There was a
            time when I hated anime and everything about the culture surrounding
            it. Now... I am whom I swore I would never become.
            <br />
            <br />I love putting my feelings into words after finishing a title;
            this is a collection of everything I&apos;ve written on{' '}
            <a
              href="https://anilist.co"
              target="_blank"
              rel="noreferrer"
              style={{ borderBottom: 'solid var(--light-text) 1px' }}
            >
              <strong>Anilist</strong>
            </a>
            . <br />
            <br />
            {totalWords.anime +
              totalWords.manga +
              totalWords.reviews} words <strong>·</strong>{' '}
            {totalEntries.anime + totalEntries.manga + totalEntries.reviews}{' '}
            entries
          </p>

          <div css={styles.social}>
            <a
              href="https://anilist.co/user/blekmus"
              target="_blank"
              rel="noreferrer"
              title="blekmus at Anilist"
              style={{ display: 'contents' }}
            >
              <svg
                viewBox="0 0 39 29"
                style={{ width: '32px', marginTop: '15px' }}
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
        <nav css={styles.content_menu}>
          <button
            css={[
              styles.content_menu_btn,
              format === 'anime' ? styles.content_menu_btn_active : null,
            ]}
            onClick={() => setFormat('anime')}
          >
            <p>Anime</p>
          </button>
          <button
            css={[
              styles.content_menu_btn,
              format === 'manga' ? styles.content_menu_btn_active : null,
            ]}
            onClick={() => setFormat('manga')}
          >
            <p>Manga</p>
          </button>
          <button
            css={[
              styles.content_menu_btn,
              format === 'reviews' ? styles.content_menu_btn_active : null,
            ]}
            onClick={() => setFormat('reviews')}
          >
            <p>Reviews</p>
          </button>
        </nav>

        {currentData.length != 0 ? (
          <div css={styles.entry_list}>
            <InfiniteScroll
              dataLength={currentData.length}
              hasMore={true}
              next={loadMore}
              loader={''}
              scrollThreshold={'100px'}
            >
              {currentData.map((entry) => (
                <Article
                  key={entry.id}
                  cover={entry.cover}
                  title={entry.title}
                  notes={entry.notes}
                  note_words={entry.note_words}
                  date={entry.date}
                />
              ))}
            </InfiniteScroll>
            <p css={styles.link_text}>{"You've reached the end"}</p>
          </div>
        ) : (
          <div>
            <p>Syncing data from Anilist...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Otaku
