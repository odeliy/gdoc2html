function extractFragment(input) {
  let inTable = false
  let freshTable = true

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '<' && freshTable) {
    }
  }

  let indices = grabFirstRowIndices(input)
  console.log(indices)
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
