import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'

const StyledTitle = styled.h1`
  color: ${theme.palette.textBold};
  span {
    color: ${theme.palette.accentPrimary};
  }
`

export const Title = () => {
  return (
    <StyledTitle>
      Google Doc to HTML <span>Formatter</span>
    </StyledTitle>
  )
}
