import {
  Group,
  Header,
  Container,
  createStyles,
  Button,
  Title,
  Text,
  SimpleGrid,
  Box,
  Input,
  Textarea,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { css } from '@emotion/react'
import React, { useRef, useState } from 'react'
import { IconCalendar, IconLocation, IconX } from '@tabler/icons'
import { gql, useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import mediaQuery from '../lib/mediaQuery'
import Head from 'next/head'
import dayjs from 'dayjs'
import Markdown from 'react-markdown'
import { NowEntry } from '../pages/now'

const QUERY = gql`
  query Query($id: ID!) {
    now(id: $id) {
      content
      location
      created_at
    }
  }
`

const UPDATE_QUERY = gql`
  mutation Mutation($id: ID!, $content: NowUpdateContent!) {
    updateNow(id: $id, content: $content) {
      id
    }
  }
`

const useStyles = createStyles((theme) => ({
  topbar: {
    position: 'sticky',
    zIndex: 2,
  },

  topbar_header: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text_input: {
    'input, textarea': {
      backgroundColor: '#222428',
      border: 'none',
    },
  },

  main_grid: {
    [mediaQuery[2]]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  grid_left: {
    [mediaQuery[2]]: {
      height: 'auto',
      borderRight: 'none',
    },
  },

  grid_right: {
    [mediaQuery[2]]: {
      height: 'auto',
      minHeight: 'auto',
      backgroundColor: 'initial',
      borderTop: `solid 1px ${theme.colors.dark[5]}`,
    },
  },

  right_content: {
    [mediaQuery[2]]: {
      paddingTop: 20,
      paddingBottom: 0,
    },
  },
}))

const styles = {
  post: css({
    margin: '0 auto',
  }),

  cover: css({
    position: 'relative',
    marginBottom: '30px',

    [mediaQuery[0]]: {
      marginBottom: '20px',
    },
  }),

  cover_overlay: css({
    boxShadow: '0 -50px 100px var(--background)inset',
    width: '100%',
    height: '100%',
    position: 'absolute',
  }),

  cover_image: css({
    borderRadius: '8px',
    maxHeight: '350px',
    width: '100%',
    objectFit: 'cover',
  }),

  header: css({
    marginBottom: '40px',

    [mediaQuery[0]]: {
      marginBottom: '20px',
    },
  }),

  header_title: css({
    fontSize: '40px',
    marginBottom: '2px',
    lineHeight: 1.2,
    fontWeight: 700,

    [mediaQuery[0]]: {
      fontSize: '30px',
      marginBottom: '5px',
    },
  }),

  header_sub: css({
    fontSize: '14px',
    color: 'var(--dark-text)',
  }),

  header_type: css({
    background: 'var(--foreground)',
    padding: '2px 5px',
    borderRadius: '5px',
    marginRight: '5px',
    color: 'var(--light-text)',
  }),

  content: css({
    lineHeight: 1.6,
    fontSize: '17px',
    marginBottom: '80px',

    h3: {
      fontFamily: 'Oxygen, sans-serif',
    },

    'h3, p': {
      marginBottom: '15px',
    },

    // every h3 followed by a p
    // 'h3:not(:last-child) + p': {
    //   marginBottom: '30px',
    // },

    // every p with a h3 after it
    'p + h3': {
      marginTop: '30px',
    },

    // all p with a p after it
    'p + p': {
      marginTop: '0px',
    },

    a: {
      borderBottom: 'solid var(--light-text) 1px',
      fontWeight: 600,
    },

    [mediaQuery[0]]: {
      fontSize: '15px',
      lineHeight: 1.5,
    },
  }),

  readnext_cont: css({
    marginTop: '50px',
  }),

  readnext_card_header: css({
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: '10px',
  }),

  readnext_text: css({
    marginBottom: '30px',
    fontWeight: 700,
  }),

  readnext_card: css({
    marginBottom: '15px',
    background: 'var(--foreground)',
    borderRadius: '8px',
    padding: '18px 24px 17px 24px',
    width: '100%',
    display: 'block',

    [mediaQuery[1]]: {
      marginBottom: '14px',
      padding: '14px 14px 10px 14px',
    },

    ':hover svg': {
      opacity: 1,
    },

    ':hover h2': {
      textDecoration: 'underline',
    },

    h2: {
      fontWeight: 700,
      fontSize: '22px',

      [mediaQuery[0]]: {
        fontSize: '19px',
      },
    },

    p: {
      margin: '0 0 8px 0',
      color: 'var(--dark-text)',
      fontSize: '14px',
      lineHeight: 1.6,
      overflow: 'hidden',
      WebkitLineClamp: '2',
      display: '-webkit-box',
      MozBoxOrient: 'vertical',
      whiteSpace: 'normal',
      WebkitBoxOrient: 'vertical',
    },
  }),

  readnext_card_title_icon: css({
    opacity: 0,
    transition: 'opacity 0.2s linear',
    color: 'var(--light-text)',
  }),
}

const AdminNow = () => {
  const router = useRouter()

  const entryContentRef = useRef<HTMLTextAreaElement>(null)

  const [saveLoading, setSaveLoading] = useState(false)

  const [nowContent, setNowContent] = useState<string | null>(null)
  const [nowLocation, setNowLocation] = useState<string | null>(null)
  const [nowDate, setNowDate] = useState<number | null>(null)

  useQuery(QUERY, {
    variables: { id: 'clwwgopk70000retqg2mvnda4' },
    fetchPolicy: "cache-and-network",

    onCompleted: (data) => {
      setNowContent(data.now.content)
      setNowLocation(data.now.location)
      setNowDate(Number(data.now.created_at))
    },
    onError: () => {
      router.push('/admin/dashboard')
    },
  })

  const { classes, theme } = useStyles()

  const [updateNow] = useMutation(UPDATE_QUERY, {
    onCompleted: () => {
      router.push('/admin/entries')
    },
    onError: (error) => {
      console.log(error)
      setSaveLoading(false)
      showNotification({
        disallowClose: true,
        message: (
          <Text weight={700} size="md">
            Failed to save
          </Text>
        ),
        color: 'red',
        icon: <IconX />,
      })
    },
  })

  const handleSaveBtn = () => {
    setSaveLoading(true)

    const now = {} as NowEntry

    if (!nowDate || !nowLocation || !nowContent) {
      setSaveLoading(false)
      return
    }

    now.content = nowContent
    now.location = nowLocation
    now.created_at = String(nowDate)

    updateNow({ variables: { id: "clwwgopk70000retqg2mvnda4", content: now } })
  }

  return (
    <>
      <Head>
        <title>Editing Now - Admin | The Lonely Lands</title>
      </Head>

      <div style={{ minHeight: '100%' }}>
        <Header height={60} className={classes.topbar}>
          <Container className={classes.topbar_header} size={2000}>
            <Group>
              <Title order={3}>Editing Now</Title>
            </Group>

            <Group>
              <Button
                color={'gray'}
                onClick={handleSaveBtn}
                loading={saveLoading}
              >
                <Text>Save</Text>
              </Button>
            </Group>
          </Container>
        </Header>

        <SimpleGrid cols={2} spacing={0} className={classes.main_grid}>
          <Box
            sx={{
              borderRight: `solid 1px ${theme.colors.dark[5]}`,

              [mediaQuery[1]]: {
                paddingLeft: '0',
                paddingRight: '0',
              },
            }}
            className={classes.grid_left}
          >
            <Container pt={30} mb={20}>
              <SimpleGrid mb={20} cols={2}>
                <DatePicker
                  placeholder="Date"
                  className={classes.text_input}
                  icon={<IconCalendar size={18} />}
                  variant="filled"
                  allowFreeInput
                  size="md"
                  labelFormat="YYYY/MM/DD"
                  inputFormat="YYYY/MM/DD"
                  value={nowDate ? new Date(nowDate) : null}
                  onChange={(e) => {
                    e ? setNowDate(e.getTime()) : null
                  }}
                />

                <Input
                  icon={<IconLocation size={18} />}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNowLocation(e.target.value)
                  }
                  placeholder="From"
                  variant="filled"
                  size="md"
                  className={classes.text_input}
                  defaultValue={nowLocation ? nowLocation : ''}
                />
              </SimpleGrid>

              <Textarea
                ref={entryContentRef}
                onChange={(e) => {
                  setNowContent(e.target.value)
                }}
                placeholder="Content"
                autosize
                minRows={2}
                variant="filled"
                size="md"
                defaultValue={nowContent ? nowContent : ''}
                className={classes.text_input}
              />
            </Container>
          </Box>
          <Box
            sx={{
              backgroundColor: 'var(--background)',
              minHeight: 'calc(100vh - 60px)',
              width: '100%',

              paddingLeft: '40px',
              paddingRight: '40px',

              [mediaQuery[1]]: {
                paddingLeft: '0',
                paddingRight: '0',
              },
            }}
            className={classes.grid_right}
          >
            <Container
              pt={22}
              mb={20}
              pl={0}
              pr={0}
              className={classes.right_content}
            >
              <div css={styles.post}>
                <header css={styles.header}>
                  <h1 css={styles.header_title}>Now</h1>
                  <p css={styles.header_sub}>
                    Updated{' '}
                    {nowDate
                      ? dayjs(Number(nowDate)).format('D MMMM, YYYY')
                      : ''}{' '}
                    from {nowLocation ? nowLocation : ''}
                  </p>
                </header>

                <div css={styles.content}>
                  {nowContent ? <Markdown>{nowContent}</Markdown> : ''}
                </div>
              </div>
            </Container>
          </Box>
        </SimpleGrid>
      </div>
    </>
  )
}

export default AdminNow
