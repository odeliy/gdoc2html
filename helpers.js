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