import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { MantineProvider } from '@mantine/core'
import type { MantineThemeOverride } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { RouterTransition } from '../components/router_transition.component'
import Script from 'next/script'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const theme = {
    colorScheme: 'dark',
    headings: {
      fontFamily: 'Rufina, serif',
    },
    fontFamily: 'Oxygen, sans-serif',
    focusRing: 'never',
    breakpoints: {
      md: 950,
    },
  } as MantineThemeOverride

  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <RouterTransition />
          <Script
            src="https://analytics.thelonelylands.com/harmless_mkay.js"
            async
            defer
            data-website-id="2407c2c3-edb2-4896-a687-3a769d0dc2a9"
          />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="manifest" href="/icons/site.webmanifest" />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  )
} 

export default MyApp
