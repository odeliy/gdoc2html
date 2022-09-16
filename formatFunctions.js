import {
    checkForBold,
    checkForItalic,
    checkForUnderline,
    checkForInternalLink,
    detectSpanTag,
    detectPTag,
    detectClosingPTag,
	detectListTag
} from './helpers.js'

export function removeDoubleBreaks(input) {
    return input
}

export function removeParagraphTags(input) {
    let newString = ''
    let inTag = false
    let inPTag = false
    let inClosingPTag = false

    for(let i = 0; i < input.length; i++) {
        if(input[i] === '<') {
            inTag = true
            inPTag = detectPTag(i, input)
            inClosingPTag = detectClosingPTag(i, input)

            if(!inPTag && !inClosingPTag) {
                newString += input[i]
            }
        }

        else if(inTag && inPTag) {
            // burn cycle while in <p> tag
            if(input[i] === '>') {
                inTag = false
                inPTag = false
            }
        }

        else if(inTag && inClosingPTag) {
            // burn cycle while in </p> tag
            if(input[i] === '>') {
                inTag = false
                inClosingPTag = false
                newString += '<br>'
            }
        }

        else {
            newString += input[i]
        }
    }
    
    return newString
}

export function formatListItems(input) {
    let newString = ''
    let inListTag = false

    for(let i = 0; i < input.length; i++) {
		if(input[i] === '<') {
			inListTag = detectListTag(i, input)

			if(inListTag) {
				newString += '<li'
			} else {
				newString += input[i]
			}
		}

		else if(inListTag) {
			// burn cycles until..
			if(input[i] === '>') {
				inListTag = false
				newString += input[i]
			}
		}

		else {
			newString += input[i]
		}
    }

    return newString
}

export function formatLinks(input) {
	let newString = ''
	let inLinkTag = false
	
	for(let i = 0; i < input.length; i++) {
		if(input[i] === '<') {
			newString += input[i]
			
			if(input[i + 1] === 'a') {
				if(input[i + 2] === ' ') {
					inLinkTag = true
				}
			}
		}

		else if(inLinkTag && input[i] === 'f') {
			let tagContents = ''

			for(let j = 0; j < input.length; j++) {
				if(input[i + j] !== '>') {
					tagContents += input[i + j]
				} else {
					inLinkTag = false
					break;
				}
			}

			let isInternalLink = checkForInternalLink(tagContents)
			if(!isInternalLink) {
				newString += 'f target="_blank" rel="noopener" '
			} else {
				newString += 'f'
			}
		}

		else {
			newString += input[i]
		}

	}
	return newString
}

export function removeSpans(input) {
    let newString = ''
    let inTag = false
    let inSpanTag = false
    let nextTagFlagged = false

    for(let i = 0; i < input.length; i++) {
        if(input[i] === '<') {
            inTag = true
            inSpanTag = detectSpanTag(i, input)
            
            if(!inSpanTag && !nextTagFlagged) {
                newString += input[i]
            }
        }

        else if(inTag && inSpanTag) {
            // burn cycle until end of tag
            if(input[i] === '>') {
                inTag = false
                inSpanTag = false
                nextTagFlagged = true
            }
        }

        else if(inTag && nextTagFlagged) {
            // burn cycle until end of tag
            if(input[i] === '>') {
                inTag = false
                nextTagFlagged = false
            }
        }

        else if(inTag && input[i] === '>') {
            inTag = false
            newString += input[i]
        }

        else {
            newString += input[i]
        }
    }

	return newString
}

// swaps relevant <span style="..."> tags with <b>, <i>, and <u>
export function swapSpans(input) {
	let newString = ''
	let inTag = false
	let inSpanTag = false
	let shouldBeBold = false;
	let shouldBeItalic = false;
	let shouldBeUnderlined = false;
	let nextTagFlagged = false
	let cleanUpCount = 0;

	for(let i = 0; i < input.length; i++) {
		if(cleanUpCount > 0) {
			cleanUpCount--
		}
		
		else if(input[i] === '<') {
            newString += input[i]
            inTag = true
            inSpanTag = detectSpanTag(i, input)
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
			let isItalic = checkForItalic(tagContents)
			let isUnderlined = checkForUnderline(tagContents)
			if(isBold) {
				newString += 'b'
				shouldBeBold = true
				nextTagFlagged = true
			} 
			
			else if(isItalic) {
				newString += 'i'
				shouldBeItalic = true
				nextTagFlagged = true
			}

			else if(isUnderlined) {
				newString += 'u'
				shouldBeUnderlined = true
				nextTagFlagged = true
			}

			else {
				cleanUpCount = 0;
				newString += input[i]
			}
		}

		else if(inTag && nextTagFlagged) {
			// do nothing until..
			if(input[i] === '>') {
				if(shouldBeBold) {
					newString += '/b>'
					inTag = false
					nextTagFlagged = false
					shouldBeBold = false;
				}
				if(shouldBeItalic) {
					newString += '/i>'
					inTag = false
					nextTagFlagged = false
					shouldBeItalic = false;
				}
				if(shouldBeUnderlined) {
					newString += '/u>'
					inTag = false
					nextTagFlagged = false
					shouldBeUnderlined = false;
				}
				
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

export function removeMetaTags(input) {
	input = input.split(/(<meta charset="utf-8">)/)
	input = input.slice(2)
	return input [0] // convert back to string
}