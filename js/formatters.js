import { detectFor, detectTag } from './detectors.js'

function removeTag(input, tagName) {
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

function swapTags(input, oldTag, newTag, attribute) {
  let newString = ''
  let inTargetOpeningTag = false
  let inTargetClosingTag = false
  let nextTagFlagged = false

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '<') {
      if (detectTag(oldTag, input, i) && detectFor(input, i, attribute)) {
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

function stripTagAttributes(input) {
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

function formatLinks(input, websiteName) {
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

function removeBoldedHeaders(input) {
  let newString = ''
  let inHeader = false
  let inStrong = false

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '<' && !inHeader && !inStrong) {
      newString += input[i]
      for (let j = 1; j <= 6; j++) {
        inHeader = detectTag(`h${j}`, input, i)
        if (inHeader) break
      }
    } else if (input[i] === '<' && inHeader && !inStrong) {
      let closingHeader = false
      for (let j = 1; j <= 6; j++) {
        closingHeader = detectTag(`h${j}`, input, i)
        if (closingHeader) {
          newString += input[i]
          inHeader = false
          break
        }
      }
      if (!closingHeader) {
        inStrong = detectTag('strong', input, i)
        if (!inStrong) {
          newString += input[i]
        }
      }
    } else if (inHeader && inStrong) {
      if (input[i] === '>') {
        inStrong = false
      }
    } else {
      newString += input[i]
    }
  }

  return newString
}

export { removeTag, swapTags, stripTagAttributes, formatLinks, removeBoldedHeaders }
