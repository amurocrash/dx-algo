function withArray (arr, value, find) {
  
  function search (arr, value, left, right) {
    if (left > right) {
      return undefined
    }

    const mid = left + Math.floor((right - left) / 2)
    if (value === arr[mid]) {
      if (!find) {
        return mid
      } 

      if (find === 'first') {
        if (mid === 0 || arr[mid - 1] !== value) {
          return mid
        } else {
          return search(arr, value, left, mid - 1)
        }
      }

      if (find === 'last') {
        if (mid === (arr.length - 1) || arr[mid + 1] !== value) {
          return mid
        } else {
          return search(arr, value, mid + 1, right)
        }
      }

      if (find === 'first-larger') {
        if (mid === (arr.length - 1) || arr[mid + 1] !== value) {
          if (arr[mid + 1] !== undefined) {
            return mid + 1
          } else {
            return undefined
          }
        } else {
          return search(arr, value, mid + 1, right)
        }
      }

      if (find === 'last-less') {
        if (mid === 0 || arr[mid - 1] !== value) {
          if (arr[mid - 1] != undefined) {
            return mid - 1
          } else {
            return undefined
          }
        } else {
          return search(arr, value, left, mid - 1)
        }
      }

    } else if (value > arr[mid]) {
      return search(arr, value, mid + 1, right)
    } else {
      return search(arr, value, left, mid - 1)
    }
  }

  return search(arr, value, 0, arr.length - 1)

}

module.exports = {
  withArray
}