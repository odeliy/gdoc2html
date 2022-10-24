function unbalancedBrackets(input) {
  let bracketCount = 0
  for (let i = 0; i < input.lenght; i++) {
    if (input[i] === '<' || input[i] === '>') {
      bracketCount++
    }
  }
  // uneven brackets ? return true
  return bracketCount % 2 === 0 ? false : true
}

export default function checkForErrors(input) {
  if (!input) {
    return 'err0'
  } else if (unbalancedBrackets(input)) {
    return 'err1'
  } else {
    return false
  }
}
