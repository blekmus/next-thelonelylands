import type { GetServerSideProps, NextPage } from 'next'
import Home from '../components/home.component'
import client from '../lib/site-client'
import { ApolloProvider } from '@apollo/client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import Head from 'next/head'
import prisma from '../lib/prisma'

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

interface Props {
  entries: Entry[]
}

const HomePage: NextPage<Props> = ({ entries }) => {
  return (
    <>
      <Head>
        <title>The Lonely Lands</title>
      </Head>
      <ApolloProvider client={client}>
        <GoogleReCaptchaProvider
          reCaptchaKey="6Le6HHghAAAAAEZFpUolmQBOLJO-84Q0p-qcW7rH"
          useEnterprise={true}
          container={{
            element: 'captcha-placeholder',
            parameters: {
              badge: 'inline',
              theme: 'dark',
            },
          }}
        >
          <Home entries={entries} />
        </GoogleReCaptchaProvider>
      </ApolloProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const entries = await prisma.entry.findMany({
      skip: 0,
      take: 5,
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return {
      props: { entries: entries },
    }
  } catch (e) {
    console.log(e)
    return {
      notFound: true,
    }
  }
}

export default HomePage
