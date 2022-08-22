import {
  Paper,
  Title,
  Text,
  Container,
  Button,
  Center
} from '@mantine/core'
import type { NextPage } from 'next'
import { IconBrandGithub } from '@tabler/icons';
import { signIn } from "next-auth/react"
import { useState } from 'react';


const Auth: NextPage = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Center style={{ height: '70vh' }}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={() => ({
            fontWeight: 900,
          })}
        >
          Welcome Back
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Enter and chanage the world
        </Text>

        <Paper withBorder shadow="md" p={30} mt={40} radius="md">
          <Center>
            <Button
              color="gray"
              leftIcon={<IconBrandGithub />}
              loading={loading}
              onClick={() => {
                setLoading(true)
                signIn('github')
              }}
            >
              Sign in with Github
            </Button>
          </Center>
        </Paper>
      </Container>
    </Center>
  )
}

export default Auth
