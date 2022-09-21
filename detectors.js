export function detectTag(tagName, input, startIndex) {
	if (input[startIndex] !== '<') {
		console.log('detectTag() error: not a tag')
		return
	}

	let testedTag = ''

	for (let i = startIndex + 1; i < input.length; i++) {
		if (input[i] !== ' ' && input[i] !== '>') {
			testedTag += input[i]
		} else {
			break
		}
	}

	let openingTag = false
	let closingTag = false

	openingTag = testedTag === tagName ? true : false
	closingTag = testedTag.slice(1) === tagName ? true : false

	return openingTag || closingTag ? true : false
}

export function detectBold(input, startIndex) {
	function checkFontWeight(i) {
		// indexOf returns -1 if string not found
		return i.indexOf('font-weight:700') > -1 ? true : false
	}

	function checkFontSize(i) {
		// all paragraph text has font-size of 11pt
		// all header tags have a different font-size
		return i.indexOf('font-size:11pt') > -1 ? true : false
	}

	let testedTag = ''

	for (let i = startIndex; i < input.length; i++) {
		testedTag += input[i]
		if (input[i] === '>') break
	}

	return checkFontWeight(testedTag) && checkFontSize(testedTag) ? true : false
}

export function detectItalic(input, startIndex) {
	let testedTag = ''

	for (let i = startIndex; i < input.length; i++) {
		testedTag += input[i]
		if (input[i] === '>') break
	}

	return testedTag.indexOf('font-style:italic') > -1 ? true : false
}

export function detectLink(input, startIndex) {
	let testedTag = ''

	for (let i = startIndex; i < input.length; i++) {
		testedTag += input[i]
		if (input[i] === '>') break
	}

	return testedTag.indexOf('a href') > -1 ? true : false
}

export function detectFor(input, startIndex, pattern) {
	let testedTag = ''

	for (let i = startIndex; i < input.length; i++) {
		testedTag += input[i]
		if (input[i] === '>') break
	}

	return testedTag.indexOf(pattern) > -1 ? true : false	
}