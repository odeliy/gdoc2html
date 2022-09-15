import {checkForBold} from './helpers.js'

function swapSpansToBolds(input) {
	let newString = ''
	let inTag = false
	let inSpanTag = false
	let cleanUpCount = 0;
	let nextTagFlagged = false

	for(let i = 0; i < input.length; i++) {
		if(cleanUpCount > 0) {
			cleanUpCount--
		}
		
		else if(input[i] === '<') {
			inTag = true
			newString += input[i]
			
			// how else to detect if in span tag?
			if(input[i + 1] === 's') {
				if(input[i + 2] === 'p') {
					inSpanTag = true
				}
			}
		}

		else if(inTag && inSpanTag) {
			let tagContents = ''

			// grab full contents of span tag
			for(let j = 0; j < input.length; j++) {
				if(input[i + j] !== '>') {
				 tagContents += input[i + j]
				 cleanUpCount = j
				} else {
					inTag = false
					inSpanTag = false
					break;
				}
			}

			let isBold = checkForBold(tagContents)
			if(isBold) {
				newString += 'b'
				nextTagFlagged = true
			} else {
				cleanUpCount = 0;
				newString += input[i]
			}
		}

		else if(inTag && nextTagFlagged) {
			// do nothing until..
			if(input[i] === '>') {
				newString += '/b>'
				inTag = false
				nextTagFlagged = false
			}
		}

		else if (input[i] === '>') {
			newString += input[i]
			inTag = false
		}

		else {
			newString += input[i]
		}
	}
	
	return newString
}

function removeMetaTags(input) {
	input = input.split(/(<meta charset="utf-8">)/)
	input = input.slice(2)
	return input [0] // convert back to string
}

function formatHTML(input) {
	let metaTagsRemoved = removeMetaTags(input)
	let boldTagsAdded = swapSpansToBolds(metaTagsRemoved)
	return boldTagsAdded
}

function pasteClipboard(event) {
	let originalHTML = event.clipboardData.getData('text/html')
	let formattedHTML = formatHTML(originalHTML)
	console.log(formattedHTML)
}

window.addEventListener('paste', (e) => pasteClipboard(e))
