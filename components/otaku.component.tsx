import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import Image from 'next/image'
import mediaQuery from '../lib/mediaQuery'
import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'
import Article from './article.component'
import AnilistFilter from '../lib/anilist-filter'
import queries from '../lib/anilist-query'
import { MediaQuery, Text } from '@mantine/core'
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

  video_background: css({
    height: '100vh',
    width: '100%',
    objectFit: 'cover',
    filter: 'brightness(40%)',
  }),

  // header: css({
  //   display: 'grid',
  //   gridTemplateColumns: '1fr 1fr',
  //   maxWidth: '1500px',
  //   margin: 'auto',
  //   width: '80%',
  //   height: '100%',
  //   alignItems: 'center',
  //   position: 'absolute',
  // top: 0,
  // right: 0,
  // left: 0,

  //   [mediaQuery[2]]: {
  //     display: 'flex',
  //     width: '90%',
  //     flexDirection: 'column',
  //     alignItems: 'start',
  // paddingTop: '150px',
  // position: 'relative',
  // marginBottom: '50px',
  //   },
  // }),

  header: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    minHeight: '70vh',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,

    [mediaQuery[2]]: {
      width: '90%',
      flexDirection: 'column',
      alignItems: 'start',
      paddingTop: '150px',
      marginBottom: '50px',
      height: 'auto',
      paddingLeft: '0',
      paddingRight: '0',
      position: 'relative',
      justifyContent: 'flex-start',
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

  content: css({
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
    },
  }),

  content_menu: css({
    marginBottom: '30px',

    [mediaQuery[2]]: {
      display: 'flex',
      justifyContent: 'center',
      columnGap: '10px',
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
  }),

  content_menu_btn_active: css({
    background: 'var(--foreground)',
  }),

  entry_list: css({}),

  entry: css({
    position: 'relative',
    marginBottom: '24px',
    background: 'var(--foreground)',
    borderRadius: '8px',
    border: '1px solid rgb(51, 51, 51)',
    padding: '24px',
    cursor: 'pointer',

    [mediaQuery[1]]: {
      marginBottom: '14px',
      padding: '14px',
    },
  }),

  entry_active: css`
    &.active .entry-content {
      color: var(--light-text);
      -webkit-line-clamp: initial;
    }
  `,

  entry_cover: css({
    marginBottom: '24px',
    textAlign: 'center',
    position: 'relative',

    [mediaQuery[1]]: {
      marginBottom: '14px',
    },
  }),

  entry_cover_img: css({
    borderRadius: '8px',
    pointerEvents: 'none',
    width: '100%',
    height: 'auto',
    maxHeight: '250px',
    objectFit: 'cover',
  }),

  entry_title: css({
    fontWeight: 700,

    [mediaQuery[0]]: {
      fontSize: '13px',
    },
  }),

  entry_content: css({
    margin: '8px 0',
    color: 'var(--dark-text)',
    fontSize: '14px',
    lineHeight: 1.6,
    overflow: 'hidden',
    WebkitLineClamp: '2',
    display: '-webkit-box',
    MozBoxOrient: 'vertical',
    whiteSpace: 'pre-wrap',
    WebkitBoxOrient: 'vertical',
  }),

  entry_footer: css({
    color: 'var(--dark-text)',
    fontSize: '13px',
  }),
}

const Otaku: NextPage = () => {
  const [format, setFormat] = useState('anime')
  const [totalEntries, _setTotalEntries] = useState({
    anime: 0,
    manga: 0,
    reviews: 0,
  })
  const [totalWords, _setTotalWords] = useState({
    anime: 0,
    manga: 0,
    reviews: 0,
  })

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

      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <video muted loop autoPlay css={styles.video_background}>
          <source src="videos/anime_scenery.webm" type="video/webm" />
        </video>
      </MediaQuery>

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
