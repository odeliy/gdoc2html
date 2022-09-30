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

	console.log(newString)
	return newString
}