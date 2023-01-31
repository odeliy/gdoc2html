import React from 'react'
import styled from 'styled-components'
import theme from '../../../styles/theme'

const StyledToggle = styled.div`
  display: grid;
  grid-template-columns: 40px 50px 40px 1fr;
  grid-gap: ${theme.gap.xs};

  .value {
    text-align: center;
  }
  .description {
    padding-left: ${theme.gap.sm};
  }

  .toggleOuter {
    width: 50px;
    height: 25px;
    background-color: ${theme.palette.blackFaded};
    border-radius: 25px;
    display: flex;
    align-items: center;

    .toggleInner {
      height: 18px;
      width: 18px;
      background-color: ${theme.palette.accentSecondary};
      border-radius: 18px;
      margin-inline: 3.5px;
    }

    .flipToggle {
      margin-left: auto;
    }
  }
`

export const Toggle = ({ feature, toggleSetting }) => {
  return (
    <StyledToggle>
      <span className='value'>{feature.toggleLabels[0]}</span>
      <div className='toggleOuter' onClick={() => toggleSetting(feature.name)}>
        <div
          className={
            `toggleInner ` + (!feature.togglePositionLeft && 'flipToggle')
          }
        ></div>
      </div>
      <span className='value'>{feature.toggleLabels[1]}</span>
      <span className='description'>{feature.description}</span>
    </StyledToggle>
  )
}
