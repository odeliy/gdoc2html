import React from 'react'
import styled from 'styled-components'
import theme from '../styles/theme'

const StyledNav = styled.div`
  ul {
    margin-top: ${theme.gap.md};
    list-style-type: none;
    max-width: ${theme.width};
    display: flex;
    gap: ${theme.gap.lg};
    align-items: center;
    justify-content: center;
  }

  ul li a {
    text-decoration: none;
  }

  ul li a:hover {
    opacity: 60%;
  }
`

export const Nav = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <a href="https://prismatic-basbousa-767168.netlify.app/">jumplink generator</a>
        </li>
        <li>
          <a href="https://slugify-lite.netlify.app/">slugify lite</a>
        </li>
        <li>
          <a href="https://chrome.google.com/webstore/detail/wp-slug-field-extender/aocnkbdfoknaeagbileplcjghlmfkaoe">
            slug extender
          </a>
        </li>
        <li>
          <a href="https://github.com/odeliy/gdoc2html">github</a>
        </li>
      </ul>
    </StyledNav>
  )
}
