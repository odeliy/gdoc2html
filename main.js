import { formatLinks, removeTag, stripTagAttributes, swapTags } from './formatters.js'
import { detectBold, detectItalic } from './detectors.js'

let app = document.getElementById('app')
let landingPageHtml =  ''

function formatHTML(input) {
	let newString = ''

	newString = removeTag(input, 'meta')
	newString = removeTag(newString, 'b')
	newString = removeTag(newString, 'div')
	newString = removeTag(newString, 'br')
	newString = removeTag(newString, 'colgroup')
	newString = removeTag(newString, 'col')
	newString = swapTags(newString, 'span', 'strong', detectBold)
	newString = swapTags(newString, 'span', 'em', detectItalic)
	newString = removeTag(newString, 'span')
	newString = stripTagAttributes(newString)
	newString = formatLinks(newString)

	return newString
}

function pasteClipboard(event) {
	let originalHTML = event.clipboardData.getData('text/html')
	let formattedHTML = formatHTML(originalHTML)

	let codeContainer = document.createElement('div')
	codeContainer.classList.add('code-container')
	codeContainer.innerText = formattedHTML

	app.innerHTML = ''
	app.appendChild(codeContainer)
}

window.addEventListener('paste', (e) => {
	landingPageHtml = app.innerHTML
	pasteClipboard(e)
})

window.addEventListener('copy', () => {
	let copiedMessage = document.createElement('div')
	copiedMessage.classList.add('copied')
	copiedMessage.classList.add('no-select')
	copiedMessage.innerText =
	'Copied! Press enter to reset or just paste again.'
	if(landingPageHtml !== '') {
		app.appendChild(copiedMessage)
	}
})

window.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		app.innerHTML = landingPageHtml
		landingPageHtml = ''
	}
})
