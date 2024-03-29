import type { NextPage } from 'next'
import { css } from '@emotion/react'
import Image from "next/legacy/image"
import mediaQuery from '../lib/mediaQuery'
import Link from 'next/link'
import BannerOtaku from '../public/images/otaku-banner.webp'
import BannerWriter from '../public/images/writer-banner.webp'
import BannerArchive from '../public/images/archive-banner.webp'
import BannerCinephile from '../public/images/cinephile-banner.webp'


const styles = {
  accordian_cont: css({
    display: 'block',
    overflow: 'hidden',
    maxWidth: '1800px',
    margin: 'auto',
  }),

  accordian: css({
    display: 'flex',
    width: '100%',
    height: '160px',

    [mediaQuery[2]]: {
      display: 'block',
      height: 'initial',
    },
  }),

  accordian_text: css({
    marginBottom: '30px',
    fontWeight: 700,
  }),

  accordian_item: css({
    flexGrow: '1',
    transition: 'all 0.8s cubic-bezier(.22,.61,.36,1)',
    position: 'relative',
    overflow: 'hidden',
    flexBasis: '1px',
    cursor: 'pointer',
    display: 'flex',

    [mediaQuery[2]]: {
      transition: 'none',
      height: '190px',
    },

    p: {
      textAlign: 'center',
    },

    ':hover': {
      flexBasis: '80px',
    },
  }),

  accordian_content: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    height: '100%',
    width: '100%',
  }),

  accordian_image: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
    filter: 'brightness(50%)',
  }),
}


const HomeAccordian: NextPage = () => {  
  return (
    <div css={styles.accordian_cont}>
      <p css={styles.accordian_text} style={{ textAlign: 'center' }}>
        Explore More
      </p>
      <div css={styles.accordian}>
        <Link href="/writer" legacyBehavior>
          <div css={styles.accordian_item}>
            <div css={styles.accordian_content}>
              <h2>Writer</h2>
              <p>
                <strong>Essays · Poems · Stories</strong>
              </p>
            </div>

            <Image
              css={styles.accordian_image}
              src={BannerWriter}
              alt="accordian image"
              loading="eager"
            />
          </div>
        </Link>

        <Link href="/cinephile" legacyBehavior>
          <div css={styles.accordian_item}>
            <div css={styles.accordian_content}>
              <h2>Cinephile</h2>
              <p>
                <strong>Movies · TV Series</strong>
              </p>
            </div>
            <Image
              css={styles.accordian_image}
              src={BannerCinephile}
              alt="accordian image"
              loading="eager"
            />
          </div>
        </Link>

        <Link href="/otaku" legacyBehavior>
          <div css={styles.accordian_item}>
            <div css={styles.accordian_content}>
              <h2>Otaku</h2>
              <p>
                <strong>Anime · Manga · Light Novels</strong>
              </p>
            </div>

            <Image
              css={styles.accordian_image}
              src={BannerOtaku}
              alt="accordian image"
              loading="eager"
            />
          </div>
        </Link>

        <Link href="/archive" legacyBehavior>
          <div css={styles.accordian_item}>
            <div css={styles.accordian_content}>
              <h2>Archive</h2>
              <p>
                <strong>Explore Everything</strong>
              </p>
            </div>

            <Image
              css={styles.accordian_image}
              src={BannerArchive}
              alt="accordian image"
              loading="eager"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomeAccordian
