import React from 'react'
import styled from 'styled-components'
import theme from '../styles/theme'

const StyledWindowHead = styled.div`
  background-color: ${theme.palette.blackFaded};
  border: 1px solid ${theme.palette.blackStrong};
  border-radius: ${theme.roundedEdge} ${theme.roundedEdge} 0 0;
  padding-inline: ${theme.gap.md};
  padding-block: ${theme.gap.sm};
  display: flex;
  justify-content: space-between;
`

export const WindowHead = () => {
  return (
    <StyledWindowHead>
      <span>v3.4.1</span>
    </StyledWindowHead>
  )
}
