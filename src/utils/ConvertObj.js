export function ConvertObj (keysOf, obj) {
    const keys = Object.keys(obj)
    const keysMatch = keysOf.filter((e) => keys.includes(e))
    let newObj = {}

    keysMatch.forEach(element => {
        newObj[element] = obj[element]
    });

    return newObj
}