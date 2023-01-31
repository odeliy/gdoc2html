function detectTag(tagName, input, startIndex, openOnly = false) {
  let testedTag = ''

  for (let i = startIndex + 1; i < input.length; i++) {
    if (input[i] !== ' ' && input[i] !== '>') {
      testedTag += input[i]
    } else {
      break
    }
  }

  let openingTag = testedTag === tagName ? true : false
  let closingTag = testedTag.slice(1) === tagName ? true : false

  if (openOnly) {
    return openingTag ? true : false
  } else {
    return openingTag || closingTag ? true : false
  }
}

function detectFor(input, startIndex, pattern) {
  let testedString = ''

  for (let i = startIndex; i < input.length; i++) {
    testedString += input[i]
    if (input[i] === '>') break
  }

  return testedString.indexOf(pattern) > -1 ? true : false
}

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

export { detectTag, detectFor, extractUrl }
