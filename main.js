import {
	removeMetaTags,
	swapSpans,
	formatLinks,
	removeSpans,
	formatListItems,
	removeParagraphTags,
	removeDoubleBreaks
} from './formatFunctions.js'

function formatHTML(input) {
	let metaTagsRemoved = removeMetaTags(input)
	let spansSwapped = swapSpans(metaTagsRemoved)
	let spansRemoved = removeSpans(spansSwapped)
	let linksFormatted = formatLinks(spansRemoved)
	let listItemsFormatted = formatListItems(linksFormatted)
	let pTagsRemoved = removeParagraphTags(listItemsFormatted)
	let doubleBreaksRemoved = removeDoubleBreaks(pTagsRemoved)
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
			<h1 style="font-size: 1.5rem; text-decoration:underline double">Google Doc to WordPress Formatter</h1>
			<p>Instructions:</p>
			<ol>
				<li>Press control + v</li>
				<li>Press control + a</li>
				<li>Press control + c</li>
				<li>Press enter to clear</li>
			</ol>
		`
	}
})
