import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import dayjs from 'dayjs'


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const entries = await prisma.entry.findMany({
    select: {
      id: true,
      updated_at: true,
    },
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  const fields = entries.map((entry) => ({
    loc: `${process.env.VERCEL_URL || 'http://localhost:3000'}/post/${
      entry.id
    }`,
    lastmod: dayjs(Number(entry.updated_at)).toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {}