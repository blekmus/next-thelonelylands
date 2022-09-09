import type { NextPage } from 'next'
import { css } from '@emotion/react'
import Image, { StaticImageData } from 'next/image'
import mediaQuery from '../lib/mediaQuery'

import LinkBooks from '../public/images/books.webp'
import LinkAlcohol from '../public/images/alcohol.webp'
import LinkAnitracker from '../public/images/anime.webp'
import LinkDocs from '../public/images/docs.webp'
import LinkWatch from '../public/images/watch.webp'
import LinkPodcasts from '../public/images/podcasts.webp'


const styles = {
  links_cont: css({
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    marginBottom: '100px',

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
    },

    [mediaQuery[0]]: {
      marginBottom: '70px'
    },
  }),

  links: css({
    display: 'grid',
    flexWrap: 'wrap',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px 20px',

    [mediaQuery[1]]: {
      gap: '20px 20px',
    },
  }),

  link_text: css({
    marginBottom: '30px',
    fontWeight: 700,

    [mediaQuery[2]]: {
      marginBottom: '20px',
    },
  }),

  link_card: css({
    borderRadius: '8px',
    backgroundColor: 'var(--foreground)',

    ':hover img': {
      filter: 'grayscale(0%)',
      transform: 'scale(1.02)', // border radius fucks up
      borderRadius: '17px 17px 0 0',
    },

    ':hover .new_tab_icon': {
      opacity: '1',
    },
  }),

  link_image_cont: css({
    height: '175px',
    position: 'relative',

    [mediaQuery[1]]: {
      height: '100px',
    },
  }),

  link_image: css({
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
    filter: 'grayscale(100%)',
    transition: 'all 0.8s cubic-bezier(.22,.61,.36,1)',
  }),

  link_new_tab: css({
    width: '20px',
    position: 'absolute',
    top: '5px',
    right: '8px',
    zIndex: '1',
    opacity: 0,
    transition: 'all 0.8s cubic-bezier(.22,.61,.36,1)',
  }),

  link_content: css({
    padding: '10px 15px 15px 15px',

    h3: {
      fontFamily: 'Oxygen, sans-serif',
      fontSize: '16px',
    },

    p: {
      fontSize: '14px',

      [mediaQuery[0]]: {
        fontSize: '13px',
        lineHeight: 1.5,
      },
    },
  }),
}

const LinkCard = ({
  title,
  description,
  image,
  url,
}: {
  title: string
  description: string
  image: StaticImageData
  url: string
}) => {
  return (
    <a css={styles.link_card} href={url} target="_blank" rel="noreferrer">
      <div css={styles.link_image_cont}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          css={styles.link_new_tab}
          className="new_tab_icon"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
            style={{ fill: '#ffffffeb' }}
          />
        </svg>

        <Image
          src={image}
          alt="cover"
          layout="fill"
          css={styles.link_image}
          loading="eager"
        />
      </div>

      <div css={styles.link_content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  )
}

const HomeLinks: NextPage = () => {
  return (
    <div css={styles.links_cont}>
      <p css={styles.link_text}>Links</p>
      <div css={styles.links}>
        <LinkCard
          title="Time Pieces"
          description="Don't you just love it when things are needlessly complicated? It's like a work of art! A collection of watches I appreciate."
          image={LinkWatch}
          url="https://dinil.notion.site/087bf556c2aa48d58fe97183b40b3ea5?v=f29ad37abc07438f939e7c84b8758dc0"
        />

        <LinkCard
          title="Alcohol"
          description="I've always had an interest in documenting what I drink. A catalogue of drinks that I am satisfied enough to tell the tales of."
          image={LinkAlcohol}
          url="https://dinil.notion.site/192adf11e1f942299d15f14817781233?v=11f81b80090146c299aa02a9c9c7ba69"
        />

        <LinkCard
          title="AniTracker"
          description="A site based on Anilist's API and design. This is what I show my peers when they ask me what kind of anime and manga I consume."
          image={LinkAnitracker}
          url="https://anime.thelonelylands.com"
        />

        <LinkCard
          title="Docs"
          description="Basically my Unix and everything techy knowledge base. I made it to help lessen the blow from my retarded memory retention abilities."
          image={LinkDocs}
          url="https://docs.thelonelylands.com"
        />

        <LinkCard
          title="Books"
          description="I read books occasionally, with more emphasis on novels than non-fiction. A list of all of the books I've read."
          image={LinkBooks}
          url="https://www.libib.com/u/blekmus"
        />

        <LinkCard
          title="Podcasts"
          description="There was a time when I was burned out by everything. I was bored and desperately wanted something new. Audio dramas revitalized me."
          image={LinkPodcasts}
          url="https://dinil.notion.site/5542c932c46146138666a1617f2eb177?v=936ae363a7854116b4f927dcf507dc6c"
        />
      </div>
    </div>
  )
}

export default HomeLinks
