import type { NextPage } from 'next'

import TopBar from './top_bar.component'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Article from './article.component'
import styles from '../styles/main_page.css'
import { ArticleEntry } from '../lib/content'

interface Props {
  entries: ArticleEntry[]
}

const Writer: NextPage<Props> = ({ entries }) => {
  const [viewType, setViewType] = useState<'ALL' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'>(
    'ALL'
  )
  const [currentVisibleData, setCurrentVisibleData] = useState<ArticleEntry[]>([])

  useEffect(() => {
    if (viewType === 'ALL') {
      setCurrentVisibleData(
        entries.slice(0, 5)
      )
      return
    }

    setCurrentVisibleData(
      entries.filter((entry) => entry.type === viewType).slice(0, 5)
    )
  }, [entries, viewType])

  const loadMore = () => {
    if (viewType === 'ALL') {
      setCurrentVisibleData(entries.slice(0, currentVisibleData.length + 5))
      return
    }

    setCurrentVisibleData(
      entries
        .filter((entry) => entry.type === viewType)
        .slice(0, currentVisibleData.length + 5)
    )
  }

  return (
    <div css={styles.base}>
      <TopBar page="writer" />

      <div css={styles.header}>
        <div>
          <h1 css={styles.title}>Writer</h1>

          <p css={styles.description}>
            I write when I feel like it, and I write what I feel like writing.
            I&apos;m a selfish writer, but don&apos;t get me wrong, I&apos;m not completely heartless.
            If someone happens to enjoy my scribbles on this digital wall, I consider that a win.
            It&apos;s a sweet bonus that makes my writing journey all the more
            satisfying.
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
        <button
          css={[
            styles.content_menu_btn,
            viewType === 'OTHER' ? styles.content_menu_btn_active : null,
          ]}
          onClick={() => setViewType('OTHER')}
        >
          <p>Other</p>
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
                    cover_type={entry.cover_type}
                    title={entry.title}
                    notes={entry.excerpt}
                    link={entry.slug}
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

export default Writer
