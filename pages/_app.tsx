import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from '@mantine/core'
import type { MantineThemeOverride } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { RouterTransition } from '../components/router_transition.component'
import Script from 'next/script';


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
            data-website-id="43721fe7-dd40-4297-a31c-1192e89f4013"
          />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  )
}

export default MyApp