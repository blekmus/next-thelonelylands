import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import Image from 'next/image'
import mediaQuery from '../lib/mediaQuery'
import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'
import AnilistPfp from '../public/images/anilist_pfp.png'
import Article from './article.component'
import { Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'

interface Entry {
  id: string
  title: string
  notes: string
  cover: string
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'SHORT' | 'ESSAY' | 'STORY' | 'OTHER'
  status: 'PUBLISHED' | 'DRAFT'
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
      flexDirection: 'column',
      alignItems: 'start',
      paddingTop: '170px',
      marginBottom: '50px',
      height: 'auto',
      paddingLeft: '0',
      paddingRight: '0',
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
      flexWrap: 'wrap',
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

const QUERY = gql`
  query Entries($types: [Types]) {
    entries(types: $types, status: PUBLISHED) {
      id
      title
      notes
      created_at
      updated_at
      type
      cover
      status
    }
  }
`

const Enthusiast: NextPage = () => {
  const [currentData, setCurrentData] = useState<Entry[]>([])
  const [currentVisibleData, setCurrentVisibleData] = useState<Entry[]>([])

  useQuery(QUERY, {
    variables: {
      types: ['OTHER'],
    },
    onCompleted: (data) => {
      setCurrentData(data.entries)
    },
    onError: (e) => {
      console.log(e)
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
    setCurrentVisibleData(
      currentData.slice(0, 5)
    )

  }, [currentData])

  const loadMore = () => {
    setCurrentVisibleData(
      currentVisibleData.slice(0, currentVisibleData.length + 5)
    )
  }

  return (
    <div css={styles.base}>
      <TopBar />

      <div css={styles.header}>
        <div>
          <h1 css={styles.title}>Enthusiast</h1>

          <p css={styles.description}>
            I&apos;m like a gust of wind, blowing through people and places without a
            care in the world.
            <br />
            <br />
            Never content with the same thing, always searching for new and
            exciting things to do. I&apos;ve found some of my favourite things in the
            most unlikely places, from music to games to abridged anime. To me,
            life is all about finding the next thing to enjoy and taking it all
            in.
            <br />
            <br />
            So sit back, relax, and enjoy the ride.
          </p>
        </div>
      </div>

      <div css={styles.content}>
        {currentVisibleData.length != 0 ? (
          <div css={styles.entry_list}>
            <InfiniteScroll
              dataLength={currentVisibleData.length}
              hasMore={true}
              next={loadMore}
              loader={''}
              scrollThreshold={'100px'}
            >
              {currentVisibleData.map((entry) => (
                <Article
                  key={entry.id}
                  cover={entry.cover}
                  title={entry.title}
                  notes={entry.notes}
                  link={entry.id}
                  date={Number(entry.created_at)}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Enthusiast
