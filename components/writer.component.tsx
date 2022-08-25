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

const Writer: NextPage = () => {
  const [viewType, setViewType] = useState<'ALL' | 'POEM' | 'ESSAY' | 'STORY'>('ALL')
  const [currentData, setCurrentData] = useState<Entry[]>([])
  const [currentVisibleData, setCurrentVisibleData] = useState<Entry[]>([])

  useQuery(QUERY, {
    variables: {
      types: ['POEM', 'ESSAY', 'STORY'],
    },
    onCompleted: (data) => {
      setCurrentData(data.entries)
    },
    onError: (e) => {
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
        currentData
          .filter((entry) => ['POEM', 'ESSAY', 'STORY'].includes(entry.type))
          .slice(0, 5)
      )
      return
    }

    setCurrentVisibleData(
      currentData.filter((entry) => entry.type === viewType).slice(0, 5)
    )

  }, [currentData, viewType])

  const loadMore = () => {
    setCurrentVisibleData(
      currentVisibleData.slice(0, currentVisibleData.length + 5)
    )
  }

  return (
    <div css={styles.base}>
      <TopBar />

      <div css={styles.header}>
        {/* <div css={styles.picture}>
          <Image
            src={AnilistPfp}
            alt="profile"
            width="300px"
            height="300px"
            layout="responsive"
            css={styles.profile_pic}
          />
        </div> */}

        <div>
          <h1 css={styles.title}>Writer</h1>

          <p css={styles.description}>
            I write for myself, and myself alone. I&apos;m a selfish writer.
            <br />
            <br />
            My writing is all about expressing my thoughts and feelings to the
            best of my ability. I write what I want to write, and if someone
            else happens to enjoy it, that&apos;s a bonus.
            <br />
            <br />
            It&apos;s just me, my thoughts and my words.
          </p>
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
            viewType === 'ESSAY' ? styles.content_menu_btn_active : null,
          ]}
          onClick={() => setViewType('ESSAY')}
        >
          <p>Essays</p>
        </button>
        <button
          css={[
            styles.content_menu_btn,
            viewType === 'POEM' ? styles.content_menu_btn_active : null,
          ]}
          onClick={() => setViewType('POEM')}
        >
          <p>Poems</p>
        </button>
        <button
          css={[
            styles.content_menu_btn,
            viewType === 'STORY' ? styles.content_menu_btn_active : null,
          ]}
          onClick={() => setViewType('STORY')}
        >
          <p>Stories</p>
        </button>
      </nav>

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
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>

      <p css={styles.link_text}>You've reached the end</p>
    </div>
  )
}

export default Writer
