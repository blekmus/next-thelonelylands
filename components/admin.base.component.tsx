import type { NextPage } from 'next'
import NavbarMinimal from './admin.navigation.component'
import { ReactNode } from 'react'
import {
  createStyles,
  Box,
} from '@mantine/core'
import mediaQuery from '../lib/mediaQuery'


interface Props {
  content: 'new' | 'dashboard' | 'entry_list' | 'edit' | 'comments'
  children: ReactNode
}

const useStyles = createStyles(() => ({
  base: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'row-reverse',

    [mediaQuery[2]]: {
      display: 'grid',
      height: '100vh',
      gridTemplateRows: '1fr 60px',
    }
  },

  content: {
    width: '100%',
    overflow: 'auto',
  },
}))


const AdminBase: NextPage<Props> = ({ content, children }) => {
  const { classes, theme } = useStyles()

  return (
    <Box className={classes.base}>
      <Box className={classes.content}>{children}</Box>

      <NavbarMinimal active={content} />
    </Box>
  )
}

export default AdminBase
