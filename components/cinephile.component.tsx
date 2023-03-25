import type { NextPage } from 'next'
import TopBar from './top_bar.component'
import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'
import Article from './article.component'
import { Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'
import styles from '../styles/main_page.css'

interface Entry {
  id: string
  title: string
  notes: string
  cover: string
  created_at: string
  updated_at: string
  type: 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY'
  status: 'PUBLISHED' | 'DRAFT'
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

const Cinephile: NextPage = () => {
  const [viewType, setViewType] = useState<'ALL' | 'SERIES' | 'MOVIE'>('ALL')
  const [currentData, setCurrentData] = useState<Entry[]>([])
  const [currentVisibleData, setCurrentVisibleData] = useState<Entry[]>([])

  useQuery(QUERY, {
    variables: {
      types: ['MOVIE', 'SERIES'],
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
    if (viewType === 'ALL') {
      setCurrentVisibleData(
        currentData.slice(0, 5)
      )
      return
    }

    setCurrentVisibleData(
      currentData.filter((entry) => entry.type === viewType).slice(0, 5)
    )
  }, [currentData, viewType])

  const loadMore = () => {
    if (viewType === 'ALL') {
      setCurrentVisibleData(currentData.slice(0, currentVisibleData.length + 5))
      return
    }

    setCurrentVisibleData(
      currentData
        .filter((entry) => entry.type === viewType)
        .slice(0, currentVisibleData.length + 5)
    )  }

  return (
    <div css={styles.base}>
      <TopBar page="cinephile" />

      <div css={styles.header}>
        <div>
          <h1 css={styles.title}>Cinephile</h1>

          <p css={styles.description}>
            Cinematic art evokes so many different emotions in me.
            <br />
            <br />
            It makes me laugh, it makes me cry, it makes me think and in rare
            moments, it fills me with excitement and awe. There is something
            about film that I find to be truly captivating. I find myself being
            drawn in by the images on the screen, and I can often find myself
            lost in what I am watching for extended periods of time.
          </p>

          <div css={styles.social}>
            <a
              href="https://trakt.tv/users/blekmus"
              target="_blank"
              rel="noreferrer"
              title="Trakt: blekmus"
              style={{ display: 'contents' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '29px' }}
                fill="currentcolor"
                viewBox="0 0 24 24"
              >
                <path d="M19.178 18.464c1.541-1.71 2.484-3.99 2.484-6.466 0-3.885-2.287-7.215-5.568-8.76l-6.089 6.076L19.178 18.464zM12.348 11.071v-.008l-.678-.676 4.788-4.79.679.689L12.348 11.071zM16.211 3.806l.677.682-5.517 5.517-.68-.679L16.211 3.806zM4.89 18.531c1.756 1.92 4.294 3.113 7.11 3.113 1.439 0 2.801-.313 4.027-.876l-6.697-6.68L4.89 18.531z" />
                <path d="M12,24c6.615,0,12-5.385,12-12S18.615,0,12,0S0,5.385,0,12S5.385,24,12,24z M12,1.211c5.95,0,10.79,4.839,10.79,10.789S17.95,22.79,12,22.79S1.211,17.95,1.211,12S6.05,1.211,12,1.211z" />
                <path d="M4.276,17.801l5.056-5.055l0.359,0.329l7.245,7.245c0.15-0.082,0.285-0.164,0.42-0.266L9.33,12.05l-4.854,4.855l-0.679-0.679l5.535-5.535l0.359,0.331l8.46,8.437c0.135-0.1,0.255-0.215,0.375-0.316L9.39,10.027l-0.083,0.015l-0.006-0.007L4.227,15.09l-0.679-0.68L15.115,2.849C14.137,2.521,13.095,2.34,12,2.34C6.663,2.337,2.337,6.663,2.337,12C2.337,14.172,3.05,16.178,4.276,17.801z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <nav css={styles.content_menu}>
        <button
          css={[
            styles.content_menu_btn,
            viewType === 'ALL' ? styles.content_menu_btn_active : null,
          ]}
          onClick={() => setViewType('ALL')}
        >
          <p>All</p>
        </button>
        <button
          css={[
            styles.content_menu_btn,
            viewType === 'SERIES' ? styles.content_menu_btn_active : null,
          ]}
          onClick={() => setViewType('SERIES')}
        >
          <p>Series</p>
        </button>
        <button
          css={[
            styles.content_menu_btn,
            viewType === 'MOVIE' ? styles.content_menu_btn_active : null,
          ]}
          onClick={() => setViewType('MOVIE')}
        >
          <p>Movies</p>
        </button>
      </nav>

      <div css={styles.content}>
        {currentVisibleData.length != 0 ? (
          <>
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
                    type={
                      viewType === 'ALL'
                        ? entry.type.charAt(0) +
                          entry.type.toLocaleLowerCase().slice(1)
                        : null
                    }
                    date={Number(entry.created_at)}
                  />
                ))}
              </InfiniteScroll>
            </div>
            <p css={styles.link_text}>{"You've reached the end"}</p>
          </>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cinephile
