import { detectFor, detectOpeningTag, detectTag } from './detectors.js'

export function removeTag(input, tagName) {
	let newString = ''
	let inCorrectTag = false

	for (let i = 0; i < input.length; i++) {
		if (input[i] === '<') {
			inCorrectTag = detectTag(tagName, input, i)

			if (!inCorrectTag) {
				newString += input[i]
			}
		} else if (inCorrectTag) {
			if (input[i] === '>') {
				inCorrectTag = false
			}
		} else {
			newString += input[i]
		}
	}

	return newString
}

export function swapTags(input, oldTag, newTag, detectFunction) {
	let newString = ''
	let inTargetOpeningTag = false
	let inTargetClosingTag = false
	let nextTagFlagged = false

	for (let i = 0; i < input.length; i++) {
		if (input[i] === '<') {
			if (detectTag(oldTag, input, i) && detectFunction(input, i)) {
				inTargetOpeningTag = true
			} else if (detectTag(oldTag, input, i) && nextTagFlagged) {
				inTargetClosingTag = true
			} else {
				newString += input[i]
			}
		} else if (inTargetOpeningTag) {
			if (input[i] === '>') {
				inTargetOpeningTag = false
				nextTagFlagged = true
				newString += '<' + newTag + '>'
			}
		} else if (inTargetClosingTag) {
			if (input[i] === '>') {
				inTargetClosingTag = false
				nextTagFlagged = false
				newString += '</' + newTag + '>'
			}
		} else {
			newString += input[i]
		}
	}

	return newString
}

export function stripTagAttributes(input) {
	let newString = ''
	let inCoreTag = false
	let inAttributesArea = false

	for (let i = 0; i < input.length; i++) {
		if (input[i] === '<') {
			newString += input[i]

			let inLink = detectFor(input, i, 'a href')
			if (!inLink) {
				inCoreTag = true
			}
		} else if (inCoreTag) {
			if (input[i] !== ' ' && input[i] !== '>') {
				newString += input[i]
			} else if (input[i] === '>') {
				newString += input[i]
				inCoreTag = false
			} else {
				inCoreTag = false
				inAttributesArea = true
			}
		} else if (inAttributesArea) {
			if (input[i] === '>') {
				newString += input[i]
				inAttributesArea = false
			}
		} else {
			newString += input[i]
		}
	}

	return newString
}

export function formatLinks(input, websiteName) {
	function extractUrl(input, startIndex) {
		let fullTag = ''
		let url = ''

		for (let i = startIndex; i < input.length; i++) {
			fullTag += input[i]
			if (input[i] === '>') break
		}

		url = fullTag.split('"')

		return url[1]
	}

	let newString = ''
	let url = ''
	let isLink = false
	let isInternalLink = false

	for (let i = 0; i < input.length; i++) {
		if (input[i] === '<') {
			newString += input[i]
			isLink = detectFor(input, i, 'a href')

			if (isLink) {
				url = extractUrl(input, i)
			}
		} else if (isLink) {
			if (input[i] === '>') {
				newString += 'a href="'
				newString += url + '" '

				isInternalLink = detectFor(url, 0, websiteName)
				if (!isInternalLink) {
					newString += 'target="_blank" rel="noopener"'
				}

				newString += '>'
				isLink = false
			}
		} else {
			newString += input[i]
		}
	}

	return newString
}

export function insertToC(input, settingsVal) {
	let newString = ''
	let inTargetTag = false

	function checkForBottomLine(input, index) {
		let headerString = ''

		for (let i = index + 1; i < input.length; i++) {
			if (input[i] !== '<') {
				headerString += input[i]
			}
			else {
				break
			}
		}

		return detectFor(headerString.toLowerCase(), 0, 'bottom line')
	}

	for (let i = 0; i < input.length; i++) {
		if (input[i] === '<') {
			inTargetTag = detectOpeningTag(settingsVal, input, i)
			newString += input[i]
		}

		else if(input[i] === '>' && inTargetTag) {
			inTargetTag = false
			if (checkForBottomLine(input, i)) {
				newString += '>'
			} else {
				newString += '>[su_bookmark id=""]'
			}
		}

		else {
			newString += input[i]
		}
	}
	return newString
}

export function formatTables(input) {
	let newTable = ''
	let inTableTag = false
	let inTable = false

	// 1. store full table in newTable
	for (let i = 0; i < input.length; i++) {
		if (input[i] === '<') {
			inTableTag = detectTag('table', input, i)
			if(inTableTag) {
				if(!inTable) { // opening tag
					inTable = true
				} else {	// closing tag
					newTable += '</table>'
					inTable = false
				}
			}
		}
		if(inTable) {
			newTable += input[i]
		}
	}

	// 2. Format into desired string
	let tableHeaderContent = ''
	let firstRow = false

	newTable = newTable.split(/(<tr>)/)
	newTable.forEach(item => {
		if(detectTag('td', item, 0) && !firstRow) {
			firstRow = true
			tableHeaderContent = item
		}
	})

	// 2.1 replace <td> tags with <th>
	let newTableHeaderContent = ''
	let inTargetTag = false
	let nextTagFlagged = false

	for (let i = 0; i < tableHeaderContent.length; i++) {
		if (tableHeaderContent[i] === '<') {
			inTargetTag = detectTag('td', tableHeaderContent, i)
			if (!inTargetTag) {
				newTableHeaderContent += tableHeaderContent[i]
			}
		}

		else if (inTargetTag && !nextTagFlagged) {
			if (tableHeaderContent[i] === '>') {
				newTableHeaderContent += '<th>'
				inTargetTag = false
				nextTagFlagged = true
			}
		}

		else if (inTargetTag && nextTagFlagged) {
			if (tableHeaderContent[i] === '>') {
				newTableHeaderContent += '</th>'
				inTableTag = false
				nextTagFlagged = false
			}
		}

		else {
			newTableHeaderContent += tableHeaderContent[i]
		}
	}
	
	newTable[0] = '<table class="table"><thead>'
	newTable[2] = newTableHeaderContent
	newTable[3] = '</thead><tbody><tr>'
	newTable = newTable.join('')

	// 3. replace old table with new table
	let newString = ''
	for (let i = 0; i < input.length; i++) {
		if (input[i] === '<') {
			inTableTag = detectTag('table', input, i)
			if(inTableTag) {
				if(!inTable) { // opening tag
					inTable = true
				} else {	// closing tag
					inTable = false
					newString += newTable
				}
			} else if (!inTable) {
				newString += '<'
			}
		} else if (!inTable) {
			newString += input[i]
		}
	}

	newString = newString.slice(0, -7)

	return newString
}