import { formatLinks, removeTag, stripTagAttributes, swapTags } from './formatters.js'
import { detectBold, detectItalic } from './detectors.js'

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
	document.getElementById('app').innerText = formattedHTML
}

window.addEventListener('paste', (e) => pasteClipboard(e))

window.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		document.getElementById('app').innerHTML = `
			<p>ready to roll..</p>
		`
	}
})