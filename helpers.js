export function checkForBold(string) {
    let index = string.indexOf('font-weight:700')
    return index !== -1 ? true : false
}