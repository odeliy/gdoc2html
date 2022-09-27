import {
	formatLinks,
	removeTag,
	stripTagAttributes,
	swapTags,
} from './js/formatters.js'
import { detectBold, detectItalic } from './js/detectors.js'
import { setupAccorion, setupSettings } from './js/helpers.js'
import { copiedHTML } from './js/copiedHTML.js'

const app = document.getElementById('app')
let pageHTML = ''

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
	newString = formatLinks(newString, fetchSelectedWebsite())
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
	pageHTML = app.innerHTML
	setupAccorion()
	setupSettings()
})

// initiate the whole show on paste
window.addEventListener('paste', (e) => pasteClipboard(e))

// reset page by pressing enter
window.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		app.innerHTML = pageHTML
		setupAccorion()
		setupSettings()
	}
})
