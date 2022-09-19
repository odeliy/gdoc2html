import {
	removeMetaTags,
	swapSpans,
	removeSpans,
	formatLinks,
	formatListItems,
	removeParagraphTags,
	removeMultipleBreaks
} from './formatFunctions.js'

function formatHTML(input) {
	let metaTagsRemoved = removeMetaTags(input)
	let spansSwapped = swapSpans(metaTagsRemoved)
	let spansRemoved = removeSpans(spansSwapped)
	let linksFormatted = formatLinks(spansRemoved)
	let listItemsFormatted = formatListItems(linksFormatted)
	let pTagsRemoved = removeParagraphTags(listItemsFormatted)
	let doubleBreaksRemoved = removeMultipleBreaks(pTagsRemoved)
	return doubleBreaksRemoved
}

function pasteClipboard(event) {
	let originalHTML = event.clipboardData.getData('text/html')
	let formattedHTML = formatHTML(originalHTML)
	document.getElementById('app').innerHTML = formattedHTML
	console.log(formattedHTML)
}

window.addEventListener('paste', (e) => pasteClipboard(e))

window.addEventListener('keypress', (e) => {
	if(e.key === 'Enter') {
		document.getElementById('app').innerHTML = `
			<p>ready to roll..</p>
		`
	}
})
