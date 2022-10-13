function detectTag(tagName, input, startIndex) {
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

function detectFor(input, startIndex, pattern) {
  let testedString = ''

  for (let i = startIndex; i < input.length; i++) {
    testedString += input[i]
    if (input[i] === '>') break
  }

  return testedString.indexOf(pattern) > -1 ? true : false
}

export { detectTag, detectFor }
