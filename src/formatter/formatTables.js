import { detectTag } from './helpers.js'
import { removeTag } from './formatters.js'

function getFirstRowIndices(input, startPoint = 0) {
  let inTableRow = false
  let indices = []

  for (let i = startPoint; i < input.length; i++) {
    if (input[i] === '<' && !inTableRow) {
      inTableRow = detectTag('tr', input, i, true)
      if (inTableRow) {
        indices = [i]
      }
    } else if (inTableRow) {
      if (input[i] === '<') {
        if (detectTag('tr', input, i)) {
          indices.push(i + 5)
          break
        }
      }
    }
  }
  return indices
}

function getTableIndices(input, startPoint) {
  let inTable = false
  let indices = {
    start: 0,
    end: 0
  }

  for (let i = startPoint; i < input.length; i++) {
    if (input[i] === '<' && !inTable) {
      inTable = detectTag('table', input, i, true)
      if (inTable) indices.start = i
    } else if (inTable) {
      if (input[i] === '<') {
        let closingTag = detectTag('table', input, i)
        if (closingTag) {
          indices.end = i + 8
          break
        }
      }
    }
  }

  return indices
}

function formatTable(input) {
  // 1. store first <tr>...</tr> into fragment
  let indices = getFirstRowIndices(input)
  let fragment = input.substring(indices[0], indices[1])

  // 2. pull fragment from original string
  let newString = input.replace(fragment, '')

  // 3. swap all <td>s for <th>s in fragment, remove <strong>s
  fragment = fragment.replace(/<td>/g, '<th>')
  fragment = fragment.replace(/<\/td>/g, '</th>')
  fragment = removeTag(fragment, 'strong')

  // 4. place new fragment inside <thead></thead>
  newString = newString.replace('<fragment>', fragment)

  return newString
}

export default function formatTables(input, website, platform) {
  // 0. modify table and head based on website and platform
  let newString = ''

  if (platform === 'wordpress') {
    if (website === 'bankrate.com') {
      newString = input.replace(
        /<table>/g, // using regex and global flag replaces all instances of
        '<table class="table --bordered --spacing-xs"><thead><fragment></thead>'
      )
    } else if (website === 'creditcards.com') {
      newString = input.replace(
        /<table>/g, // using regex and global flag replaces all instances of
        '<table class="table table-bordered table-striped" border="0"><thead><fragment></thead>'
      )
    }
  } else if (platform === 'storyblok') {
    newString = input.replace(
      /<table>/g, // using regex and global flag replaces all instances of
      '<table class="table"><thead><fragment></thead>'
    )
  }

  // 1. create array of all tables start/end points
  let tableIndices = []
  for (let i = 0; i < newString.length; i++) {
    if (newString[i] === '<') {
      const inTable = detectTag('table', newString, i, true)
      if (inTable) tableIndices.push(getTableIndices(newString, i))
    }
  }

  // 2. store all tables in an array
  let tables = tableIndices.map((setOfIndices) =>
    newString.substring(setOfIndices.start, setOfIndices.end)
  )

  // 3. remove tables from original string, leave <placeholder>s in place
  tables.forEach((table) => {
    newString = newString.replace(table, '<placeholder>')
  })

  // 4. remove <p> tags from tables
  tables = tables.map((table) => {
    let arr = table.split(/(?=<td>)/g)
    arr = arr.map((item) => (item = removeTag(item, 'p')))
    return arr.join('')
  })

  // 5. for each table, do the actual formatTable() stuff
  tables = tables.map((table) => formatTable(table))

  // 6. parse newString, replace <placeholder>s with the formatted tables
  tables.forEach((table) => {
    newString = newString.replace('<placeholder>', table)
  })

  return newString
}
