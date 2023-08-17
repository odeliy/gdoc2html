import { detectTag } from './helpers'

function styleLists(input, toggleValue) {
  if (toggleValue === 'listStyleOn') {
    let newString = ''
    let inUnorderedListTag = false
    let inOrderedListTag = false
    let inListItemTag = false

    for (let i = 0; i < input.length; i++) {
      if (input[i] === '<') {
        inUnorderedListTag = detectTag('ul', input, i, true)
        inOrderedListTag = detectTag('ol', input, i, true)
        inListItemTag = detectTag('li', input, i, true)
        if (!inUnorderedListTag && !inOrderedListTag && !inListItemTag) {
          newString += input[i]
        }
      } else if (inUnorderedListTag) {
        if (input[i] === '>') {
          newString += '<ul class="List List--unordered text-lg">'
          inUnorderedListTag = false
        }
      } else if (inOrderedListTag) {
        if (input[i] === '>') {
          newString += '<ol class="List List--ordered text-lg">'
          inOrderedListTag = false
        }
      } else if (inListItemTag) {
        if (input[i] === '>') {
          newString += '<li class="List-item">'
          inListItemTag = false
        }
      } else {
        newString += input[i]
      }
    }
    return newString
  } else {
    return input
  }
}

export default styleLists
