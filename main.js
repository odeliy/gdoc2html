import setup from './js/setup.js'
import formatTables from './js/formatTables.js'
import {
  formatLinks,
  removeBoldedHeaders,
  removeTag,
  stripTagAttributes,
  swapTags
} from './js/formatters.js'
import { failureHTML, successHTML } from './js/messages.js'

const app = document.getElementById('app')

function formatHTML(input) {
  const junkTags = ['meta', 'b', 'div', 'br', 'colgroup', 'col']
  let newString = input

  junkTags.forEach((tag) => {
    newString = removeTag(newString, tag)
  })

  newString = swapTags(newString, 'span', 'strong', 'font-weight:700')
  newString = swapTags(newString, 'span', 'em', 'font-style:italic')
  newString = removeTag(newString, 'span')
  newString = stripTagAttributes(newString)
  newString = formatLinks(newString, localStorage.getItem('website') || 'bankrate.com')
  newString = removeBoldedHeaders(newString)
  if (localStorage.getItem('tables') === 'on') newString = formatTables(newString)

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
      app.appendChild(successMessage)
    })
  } else {
    let failureMessage = document.createElement('div')
    failureMessage.classList.add('message')
    failureMessage.innerHTML = failureHTML
    app.appendChild(failureMessage)
  }
}

window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    location.reload()
    setup()
  }
})

window.addEventListener('load', () => setup())

window.addEventListener('paste', (e) => processClipboard(e))
