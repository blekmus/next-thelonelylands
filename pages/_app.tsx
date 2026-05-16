import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import type { MantineThemeOverride } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { RouterTransition } from '../components/router_transition.component'

function MyApp({ Component, pageProps }: AppProps) {
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
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <RouterTransition />
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  )
} 

export default MyApp
