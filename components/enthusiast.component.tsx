import type { NextPage } from 'next'
import { css } from '@emotion/react'
import TopBar from './top_bar.component'
import mediaQuery from '../lib/mediaQuery'
import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'
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
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'
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

  entry_list: css({}),

  link_text: css({
    marginBottom: '50px',
    fontWeight: 700,
    textAlign: 'center',
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
            I&apos;m like a gust of wind, blowing through people and places
            without a care in the world.
            <br />
            <br />
            Never content with the same thing, always searching for new and
            exciting things to do. I&apos;ve found some of my favourite things
            in the most unlikely places, from music to games to abridged anime.
            To me, life is all about finding the next thing to enjoy and taking
            it all in.
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

      <p css={styles.link_text}>{"You've reached the end"}</p>
    </div>
  )
}

export default Enthusiast
