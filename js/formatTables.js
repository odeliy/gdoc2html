import { detectTag } from './detectors.js'
import { removeTag, swapTags } from './formatters.js'

function addNewTagsAndClasses(input) {
  let newString = ''
  let inTable = false

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '<') {
      inTable = detectTag('table', input, i, true)
      if (!inTable) newString += input[i]
    } else if (inTable) {
      if (input[i] === '>') {
        newString += `<table class="table --bordered --spacing-xs"><thead></thead>`
        inTable = false
      }
    } else {
      newString += input[i]
    }
  }

  return newString
}

function removePTags(input) {
  let arr = input.split(/(?=<td>)/g)
  arr = arr.map((item) => (item = removeTag(item, 'p')))
  return arr.join('')
}

function extractFragment(input) {
  let inTableRow = false
  let startIndex = 0
  let endIndex = 0

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '<' && !inTableRow) {
      inTableRow = detectTag('tr', input, i, true)
      if (inTableRow) startIndex = i
    } else if (inTableRow) {
      if (input[i] === '<') {
        if (detectTag('tr', input, i)) {
          endIndex = i + 5
          break
        }
      }
    }
  }
  return input.substring(startIndex, endIndex)
}

function populateTHead(input) {
  // 1. store first <tr>...</tr> into fragment
  let fragment = extractFragment(input)

  // 2. pull fragment from original string
  let newString = input.replace(fragment, '')

  // 3. swap all <td>s for <th>s in fragment
  let newFragment = ''
  let inModZone = false

  for (let i = 0; i < fragment.length; i++) {
    if (fragment[i] === '<') {
      newFragment += fragment[i]
      inModZone = detectTag('td', fragment, i)
    } else if (inModZone) {
      if (fragment[i] === 'd') {
        newFragment += 'h'
        inModZone = false
      } else {
        newFragment += fragment[i]
      }
    } else {
      newFragment += fragment[i]
    }
  }

  // 4. place new fragment inside <thead></thead>
  let finalString = ''
  let inOpenHead = false

  for (let i = 0; i < newString.length; i++) {
    if (newString[i] === '<') {
      inOpenHead = detectTag('thead', newString, i, true)
      finalString += newString[i]
    } else if (inOpenHead) {
      finalString += newString[i]
      if (newString[i] === '>') {
        finalString += newFragment
        inOpenHead = false
      }
    } else {
      finalString += newString[i]
    }
  }
  return finalString
}

export default function formatTables(input) {
  let newString = ''

  newString = addNewTagsAndClasses(input)
  newString = removePTags(newString)
  newString = populateTHead(newString)

  return newString
}
