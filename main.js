import { formatLinks, removeTag, stripTagAttributes, swapTags } from './formatters.js'
import { detectBold, detectItalic } from './detectors.js'

let app = document.getElementById('app')
let pageHTML =  ''

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

	navigator.clipboard.writeText(formattedHTML)
		.then(() => {
			let copiedMessage = document.createElement('div')
			copiedMessage.classList.add('copied')
			copiedMessage.innerHTML = `
			<p><span style="color: var(--palette-accent-secondary); font-size: 2rem; display: block;">Success!</span> Clipboard conversion complete. Press <span style="color: var(--palette-text-primary)">enter</span> to reset or just paste again.</p>
			`
			app.appendChild(copiedMessage)
		})
}

window.addEventListener('load', () => pageHTML = app.innerHTML)

window.addEventListener('paste', (e) => pasteClipboard(e))

window.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		app.innerHTML = pageHTML
		setupAccorion()
	}
})

/******************/
/*** Accordions ***/
/******************/

function setupAccorion() {
	const accordion = document.getElementsByClassName('accordion__content-box')

	for (let i = 0; i < accordion.length; i++) {
		accordion[i].addEventListener('click', (e) => {
			accordion[i].classList.toggle('active')
		})
	}
}

setupAccorion()