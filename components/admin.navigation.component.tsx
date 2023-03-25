import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Modal,
  Center,
  Text,
  SimpleGrid,
  Button,
} from '@mantine/core'
import {
  TablerIcon,
  // IconHome2,
  IconPlus,
  IconLogout,
  IconLayoutList,
  IconEdit,
  // IconQuote,
} from '@tabler/icons'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import mediaQuery from '../lib/mediaQuery'

const useStyles = createStyles((theme) => ({
  link: {
    width: 45,
    height: 45,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.dark[0],

    '&:hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  base: {
    [mediaQuery[2]]: {
      borderRight: 'none',
      height: 60,
      width: '100%',
      flexDirection: 'row',
      padding: 0,
      alignItems: 'center',
      borderTop: `1px solid ${theme.colors.dark[5]}`,
    },
  },

  icon_cont: {
    [mediaQuery[2]]: {
      flexDirection: 'row',
    },
  },
}))

interface NavbarLinkProps {
  icon: TablerIcon
  label: string
  active?: boolean
  onClick?(): void
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  )
}

interface Props {
  active: 'new' | 'dashboard' | 'entry_list' | 'edit' | 'comments'
}

const NavbarMinimal = ({ active }: Props) => {
  const [currentActive, setCurrentActive] = useState(active)
  const [logoutModalOpened, setLogoutModalOpened] = useState(false)
  const router = useRouter()
  const { classes } = useStyles()

  return (
    <Navbar
      height={'100vh'}
      width={{ base: 80 }}
      p="md"
      className={classes.base}
    >
      <Navbar.Section grow>
        <Stack justify="center" spacing={10} className={classes.icon_cont}>
          {/* <NavbarLink
            icon={IconHome2}
            label="Dashboard"
            onClick={() => {
              setCurrentActive('dashboard')
              router.push('/admin/dashboard')
            }}
            active={currentActive === 'dashboard'}
          /> */}
          <NavbarLink
            icon={IconLayoutList}
            label="Entries"
            onClick={() => {
              setCurrentActive('entry_list')
              router.push('/admin/entries')
            }}
            active={currentActive === 'entry_list'}
          />
          {/* <NavbarLink
            icon={IconQuote}
            label="Comments"
            onClick={() => {
              setCurrentActive('comments')
              router.push('/admin/comments')
            }}
            active={currentActive === 'comments'}
          /> */}

          <NavbarLink
            icon={IconPlus}
            label="New Entry"
            onClick={() => {
              setCurrentActive('new')
              router.push('/admin/new')
            }}
            active={currentActive === 'new'}
          />
          {currentActive === 'edit' && (
            <NavbarLink
              icon={IconEdit}
              label="Edit Entry"
              active={currentActive === 'edit'}
            />
          )}
        </Stack>
      </Navbar.Section>

      <Navbar.Section>
        <Modal
          opened={logoutModalOpened}
          withCloseButton={false}
          onClose={() => {
            setLogoutModalOpened(false)
          }}
          centered
          size={'sm'}
          padding="xl"
        >
          <Center>
            <Text size="xl" color="red" weight={700}>
              Warning
            </Text>
          </Center>

          <Center>
            <Text size="sm">You are about to log out</Text>
          </Center>

          <SimpleGrid spacing={'xl'} cols={2} mt={30}>
            <Button
              color={'gray'}
              variant={'light'}
              onClick={() => setLogoutModalOpened(false)}
            >
              Cancel
            </Button>
            <Button color="red" onClick={() => {
              signOut()
              router.push('/admin')
            }}>
              Confirm
            </Button>
          </SimpleGrid>
        </Modal>

        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={() => setLogoutModalOpened(true)}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}

export default NavbarMinimal
