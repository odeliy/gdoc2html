import setup from './js/setup.js'
import { formatLinks, removeBoldedHeaders, removeTag, stripTagAttributes, swapTags } from './js/formatters.js'
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

window.addEventListener('load', () => {
  setup()
  // store app HTML after setup b/c classes are added/removed
  localStorage.setItem('initialAppHTML', app.innerHTML)
})

// reset app by pressing enter
window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    app.innerHTML = localStorage.getItem('initialAppHTML')
    setup()
  }
})

// this starts all the action
window.addEventListener('paste', (e) => processClipboard(e))
