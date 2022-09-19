export function checkForInternalLink(string) {
	let index = string.indexOf('bankrate')
    return index !== -1 ? true : false
}

export function checkForBold(string) {
    let index = string.indexOf('font-weight:700')
    return index !== -1 ? true : false
}

export function checkForItalic(string) {
    let index = string.indexOf('font-style:italic')
    return index !== -1 ? true : false   
}

export function checkForUnderline(string) {
    let index = string.indexOf('text-decoration:underline')
    return index !== -1 ? true : false
}

export function detectSpanTag(iterator, string) {
    // this actually works ok, no other html tag starts with 'sp'
    if(string[iterator + 1] === 's' && string[iterator + 2] === 'p') {
       return true
    } else {
        return false
    }
}

export function detectPTag(iterator, string) {
    if(string[iterator + 1] === 'p' && string[iterator + 2] === ' ') {
       return true
    } else {
        return false
    }
}

export function detectClosingPTag(iterator, string) {
    if(string[iterator + 1] === '/' && string[iterator + 2] === 'p' && string[iterator + 3] === '>') {
        return true
    } else {
        return false
    }
}

export function detectListTag(iterator, string) {
    if(string[iterator + 1] === 'l' && string[iterator + 2] === 'i' && string[iterator + 3] === ' ') {
       return true
    } else {
        return false
    }
}

export function detectXHTMLBreak(iterator, string) {
    if(string[iterator + 1] === 'b' && string[iterator + 2] === 'r' && string[iterator + 3] === ' ' && string[iterator + 4] === '/') {
       return true
    } else {
        return false
    }
}