import React from 'react'
import styled from 'styled-components'
import theme from '../../../styles/theme'
import { Toggle } from './Toggle'

const StyledSettings = styled.div`
  margin-block: ${theme.gap.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.gap.sm};
`

export const Settings = ({ settings, toggleSetting }) => {
  return (
    <StyledSettings>
      {settings.map((feature, index) => (
        <Toggle key={index} feature={feature} toggleSetting={toggleSetting} />
      ))}
    </StyledSettings>
  )
}
