import { removeTag } from './formatters.js'
import { detectFor } from './helpers.js'

function removeParagraphsInsideLists(input) {
  let listArr = input.split(/(?=<li>)/g)

  listArr = listArr.map((listItem) => {
    const listDected = detectFor(listItem, 0, '<li>')
    if (listDected) {
      listItem = removeTag(listItem, 'p')
    }
    return listItem
  })

  return listArr.join('')
}

export default function formatStoryblok(input) {
  let newString = removeParagraphsInsideLists(input)
  return newString
}
