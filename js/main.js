import setup from './setup.js'
import formatTables from './formatTables.js'
import formatStoryblok from './formatStoryblok.js'
import { failureHTML, successHTML } from './messages.js'
import {
  addTocShortcode,
  formatLinks,
  removeBoldedHeaders,
  removeTag,
  stripTagAttributes,
  swapTags
} from './formatters.js'

const message = document.getElementById('message')

function formatHTML(input) {
  // get rid of junk
  const junkTags = ['meta', 'b', 'div', 'br', 'colgroup', 'col']
  let newString = input
  junkTags.forEach((tag) => {
    newString = removeTag(newString, tag)
  })

  // perform platform agnostic formatting
  newString = swapTags(newString, 'span', 'strong', 'font-weight:700')
  newString = swapTags(newString, 'span', 'em', 'font-style:italic')
  newString = removeTag(newString, 'span')
  newString = stripTagAttributes(newString)
  newString = formatLinks(newString, localStorage.getItem('website'))
  newString = removeBoldedHeaders(newString)

  // storyblok specific formatting
  if (localStorage.getItem('platform') === 'storyblok') newString = formatStoryblok(newString)

  // modify tables based on website and platform
  if (localStorage.getItem('tables') === 'on')
    newString = formatTables(
      newString,
      localStorage.getItem('website'),
      localStorage.getItem('platform')
    )

  // add ToC shortcode if in WP && BR
  if (
    localStorage.getItem('toc') === 'on' &&
    localStorage.getItem('website') === 'bankrate.com' &&
    localStorage.getItem('platform') === 'wordpress'
  )
    newString = addTocShortcode(newString)

  return newString
}

function processClipboard(event) {
  let originalHTML = event.clipboardData.getData('text/html')

  if (originalHTML) {
    let formattedHTML = formatHTML(originalHTML)
    navigator.clipboard.writeText(formattedHTML).then(() => {
      let successMessage = document.createElement('div')
      successMessage.classList.add('message')
      successMessage.innerHTML = successHTML
      message.appendChild(successMessage)
    })
  } else {
    let failureMessage = document.createElement('div')
    failureMessage.classList.add('message')
    failureMessage.innerHTML = failureHTML
    message.appendChild(failureMessage)
  }
}

window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    location.reload()
    setup()
  }
})

window.addEventListener('load', () => setup())

// All the action starts here...
window.addEventListener('paste', (e) => processClipboard(e))
