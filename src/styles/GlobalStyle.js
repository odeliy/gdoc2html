import { createGlobalStyle } from 'styled-components'
import theme from './theme'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${theme.palette.blackFaded};
    color: ${theme.palette.text};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: ${theme.gap.lg};
  }

  a {
    color: ${theme.palette.accentSecondary};
  }
`
