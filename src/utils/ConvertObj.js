/*
    Function Name Convert Obj (ConvertObj)
    @param keyOf: Array<String>
    @param obj: Object 

    TODO: This function verifies that the object contains the keys in the array
    TODO: If the object contains the keys of the array, we return the object with the checked properties,
    TODO: If there are properties that are not in the array, they will not be returned.
*/
export function ConvertObj (keysOf, obj) {
    const keys = Object.keys(obj)
    const keysMatch = keysOf.filter((e) => keys.includes(e))
    let newObj = {}

    keysMatch.forEach(element => {
        newObj[element] = obj[element]
    });

    return newObj
}