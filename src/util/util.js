export function deepClone(item) {

  if (typeof item != 'object') {
    return item
  }
  if (item instanceof Object) {
    var distObject = {};
    Object.keys(item).forEach(i => {
      distObject[i] = deepClone(item[i])
    })
    return distObject
  }
  if (item instanceof Array) {
    var distArray = []
    item.forEach(i => {
      distArray.push(deepClone(i))
    })
    return distArray
  }
}



