import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'

const StyledFooter = styled.div`
  line-height: 1.5em;

  h2 {
    color: ${theme.palette.textBold};
    margin-top: ${theme.gap.md};
    margin-bottom: ${theme.gap.xs};
  }

  ol {
    padding-left: ${theme.gap.sm};
  }
`

export const Footer = () => {
  return (
    <StyledFooter>
      <h2>What is this?</h2>
      <p>
        This application formats rich text from Google Docs into clean HTML that can be pasted
        directly into the WordPress text editor (i.e. code section).
      </p>
      <h2>How to use:</h2>
      <ol>
        <li>Copy the text from a Google Doc (⊞: CTRL-C /: ⌘-C)</li>
        <li>Paste the copied text while this application is open (⊞: CTRL-V /: ⌘-V)</li>
        <li>
          A message that says, "Success!" will appear. This means you have successfully added the
          formatted text to your clipboard.
        </li>
        <li>In WordPress: Paste the formatted text into the "Text" panel.</li>
        {/* <li>In Storyblok: Paste the formatted text into the "Source code" of a WYSIWYG block.</li> */}
      </ol>
    </StyledFooter>
  )
}
