import { css } from '@emotion/react'
import mediaQuery from '../lib/mediaQuery'

const styles = {
  base: css({
    backgroundColor: 'var(--background)',
  }),

  header: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',
    minHeight: '70vh',

    [mediaQuery[2]]: {
      minHeight: 'initial',
      flexDirection: 'column',
      alignItems: 'start',
      paddingTop: '60px',
      marginBottom: '70px',
      height: 'auto',
      justifyContent: 'flex-start',
    },

    [mediaQuery[1]]: {
      paddingLeft: '0',
      paddingRight: '0',
      width: '90%',
    },
  }),

  title: css({
    fontSize: '35px',
    marginBottom: '15px',

    [mediaQuery[0]]: {
      fontSize: '30px',
    },
  }),

  description: css({
    lineHeight: 1.6,

    [mediaQuery[0]]: {
      fontSize: '15px',
      lineHeight: 1.5,
    },
  }),

  social: css({
    display: 'flex',
    columnGap: '10px',
    marginTop: '15px',

    [mediaQuery[0]]: {
      justifyContent: 'center',
      marginTop: '30px',
      columnGap: '20px',
    },
  }),

  content_menu: css({
    maxWidth: '760px',
    margin: '0 auto',
    padding: '0 24px',
    marginBottom: '20px',

    [mediaQuery[1]]: {
      width: '90%',
      padding: '0',
    },

    [mediaQuery[0]]: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
        columnGap: '5px',
      marginBottom: '30px',
    },
  }),

  content_menu_btn: css({
    padding: '9px 17px 11px 17px',
    marginRight: '20px',
    borderRadius: '6px',
    color: 'var(--light-text)',
    cursor: 'pointer',
    background: 'none',
    fontWeight: 600,
    fontSize: '16px',

    [mediaQuery[2]]: {
      margin: 0,
    },

    [mediaQuery[0]]: {
      padding: '9px 13px 11px 13px',
    },
  }),

  content_menu_btn_active: css({
    background: 'var(--foreground)',
  }),

  content: css({
    maxWidth: '760px',
    margin: '0 auto',
    padding: '24px',

    [mediaQuery[1]]: {
      padding: 0,
      width: '90%',
      marginBottom: '40px',
    },
  }),

  entry_list: css({}),

  link_text: css({
    paddingBottom: '40px',
    fontWeight: 700,
    textAlign: 'center',
    color: 'var(--dark-text)',
    fontSize: '15px',
  }),
}


export default styles