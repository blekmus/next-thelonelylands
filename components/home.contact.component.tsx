import type { NextPage } from 'next'
import { css } from '@emotion/react'
import mediaQuery from '../lib/mediaQuery'
import { useForm } from '@mantine/form'
import { Button, Group, Text, Textarea, TextInput } from '@mantine/core'
import { useCallback, useRef, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'
import ReCAPTCHA from 'react-google-recaptcha'

const CREATE_COMMENT = gql`
  mutation Mutation($content: CommentCreateContent!) {
    createComment(content: $content) {
      id
    }
  }
`

const styles = {
  contact_text: css({
    marginBottom: '30px',
    fontWeight: 700,

    [mediaQuery[2]]: {
      marginBottom: '20px',
    },
  }),

  contact: css({
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    marginBottom: '120px',

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
      marginBottom: '30px',
    },

    [mediaQuery[0]]: {
      marginBottom: '70px',
    },
  }),

  content: css({
    [mediaQuery[0]]: {
      fontSize: '15px',
      lineHeight: 1.5,
    },
  }),

  contact_form: css({}),
}

const HomeContact: NextPage = () => {
  const form = useForm({
    initialValues: {
      name: '',
      message: '',
    },
  })

  const recaptchaRef = useRef<ReCAPTCHA>(null)

  // const { executeRecaptcha } = useGoogleReCaptcha()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      setSubmitLoading(false)
      setSubmitted(true)
    },
    onError: () => {
      setSubmitLoading(false)
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

  const handleSubmit = useCallback(
    async ({ name, message }: { name: string; message: string }) => {
      setSubmitLoading(true)

      const token = await recaptchaRef.current?.executeAsync()

      if (!token) {
        showNotification({
          disallowClose: true,
          message: (
            <Text weight={700} size="md">
              Captcha error. Please refresh page and try again
            </Text>
          ),
          color: 'red',
          icon: <IconX />,
        })

        setSubmitLoading(false)
        return
      }

      createComment({
        variables: {
          content: {
            token,
            name,
            message,
          },
        },
      })
    },
    [createComment]
  )

  return (
    <div css={styles.contact}>
      <p css={styles.contact_text}>Don&apos;t be shy. Say Hi!</p>

      <div css={styles.content}>
        <p style={{ lineHeight: 1.6, marginBottom: 20 }}>
          Have any comments, questions or just want to send me something? The
          easiest way to reach me is by <strong>filling the form</strong> below.
          You can also send me an email at <strong>dinil[at]pm.me</strong>
        </p>
        <p style={{ lineHeight: 1.6, marginBottom: 20 }}>
          If you want to have a chat. Hit me up on{' '}
          <a
            title="Walker#6140"
            href="https://discordid.netlify.app/?id=534321754517143553"
            style={{ borderBottom: 'solid var(--light-text) 1px' }}
            target="_blank"
            rel="noreferrer"
          >
            <strong>Discord</strong>
          </a>
        </p>
      </div>

      <div css={styles.contact_form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            disabled={submitted ? true : false}
            required
            placeholder="William Shakespeare"
            variant="filled"
            size="md"
            label="Name"
            mb={15}
            sx={{
              maxWidth: '300px',

              input: {
                backgroundColor: '#1f1f23',
                border: 'none',
              },

              label: {
                fontSize: '14px',
                marginBottom: '5px',
                fontWeight: 600,
              },
            }}
            {...form.getInputProps('name')}
          />

          <Textarea
            disabled={submitted ? true : false}
            required
            label="Message"
            placeholder="'tis true, the greatness of this site. For all things you can do, it doth surpass all other sites. The details, the substance, the essence; 'tis a veritable cornucopia of delights! What more could one ask for?"
            autosize
            minRows={3}
            variant="filled"
            size="md"
            sx={{
              textarea: {
                border: 'none',
                backgroundColor: '#1f1f23',
              },

              label: {
                fontSize: '14px',
                marginBottom: '5px',
                fontWeight: 600,
              },
            }}
            {...form.getInputProps('message')}
            mb={20}
          />

          <div id="captcha-placeholder" style={{ display: 'none' }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="6Lfb5M0hAAAAAA-3aDqeeFTAR60p-BXmXz15Eg5P"
              badge="inline"
              theme="dark"
            />
          </div>

          <Group position="left" mt={20}>
            <Button
              disabled={submitted ? true : false}
              type="submit"
              loading={submitLoading}
              variant="filled"
              color="gray"
              sx={{
                backgroundColor: '#1f1f23',
              }}
            >
              Send
            </Button>

            {submitted ? (
              <Text color="#46dc63" size="sm" weight={600}>
                Sent!
              </Text>
            ) : (
              ''
            )}
          </Group>
        </form>
      </div>
    </div>
  )
}

export default HomeContact
