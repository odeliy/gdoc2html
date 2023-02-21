import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'
import { Footer } from './Footer'
import { Settings } from './Settings/Settings'
import { Title } from './Title'

const StyledWindowBody = styled.div`
  padding: ${theme.gap.md};
`

export const WindowBody = ({ settings, toggleSetting }) => {
  return (
    <StyledWindowBody>
      <Title />
      <Settings settings={settings} toggleSetting={toggleSetting} />
      <Footer />
    </StyledWindowBody>
  )
}
