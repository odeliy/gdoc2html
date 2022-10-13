import { formatLinks, removeBoldedHeaders, removeTag, stripTagAttributes, swapTags } from './js/formatters.js'
import { setup } from './js/helpers.js'
import { copiedHTML } from './js/copiedHTML.js'

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

function pasteClipboard(event) {
  let originalHTML = event.clipboardData.getData('text/html')
  let formattedHTML = formatHTML(originalHTML)

  // navigator api lets your write directly to clipboard
  navigator.clipboard.writeText(formattedHTML).then(() => {
    let copiedMessage = document.createElement('div')
    copiedMessage.classList.add('copied')
    copiedMessage.innerHTML = copiedHTML
    app.appendChild(copiedMessage)
  })
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
window.addEventListener('paste', (e) => pasteClipboard(e))
