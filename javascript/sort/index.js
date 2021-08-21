function swap (arr, p, q) {
  const temp = arr[p]
  arr[p] = arr[q]
  arr[q] = temp
}

function noNeedSort (arr) {
  return !arr || arr.length <= 1
}

function getSort(desc = false) {
  if (desc) {
    return (n1, n2) => n1 > n2
  } else {
    return (n1, n2) => n1 < n2
  }
}

function findExtremeValue(arr) {
  let min = arr[0]
  let max = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
    if (arr[i] > max) {
      max = arr[i]
    }
  }

  return {
    min,
    max
  }
}

function bubble (arr, desc = false) {
  if (noNeedSort(arr)) {
    return
  }

  const sort = getSort(desc)

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (sort(arr[j], arr[j + 1])) {
        swap(arr, j, j + 1)
      }
    }
  }
}

function insert (arr, desc = false) {
  if (noNeedSort(arr)) {
    return
  }

  const sort = getSort(desc)

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i]
    for (let j = 0; j < i; j++) {
      if (sort(current, arr[j])) {
        for (let k = i; k > j; k--) {
          arr[k] = arr[k - 1]
        }
        arr[j] = current
        break
      }
    }
  }
}

function selection (arr, desc = false) {
  if (noNeedSort(arr)) {
    return
  }

  const sort = getSort(desc)

  for (let i = 0; i < arr.length - 1; i++) {
    let landmark = arr[i]
    let index = i

    for (let j = i + 1; j < arr.length; j++) {
      if (sort(arr[j], landmark)) {
        landmark = arr[j]
        index = j
      }
    }

    if (i !== index) {
      swap(arr, i, index)
    }
  }
}

function merge (arr, desc = false) {

  function combinate (left, right) {
    const res = [...left, ...right]
    insert(res, desc)
    
    return res
  }

  function realMerge (arr, p, q) {
    if (p >= q) {
      return [arr[p]] 
    }

    const mid = p + Math.floor((q - p) / 2)

    const left = realMerge(arr, p, mid)
    const right = realMerge(arr, mid + 1, q)

    return combinate(left, right)
  }

  const res = realMerge(arr, 0, arr.length - 1)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = res[i]
  }
}

function quick (arr, desc = false) {

  function partition (arr, p, q) {
    const sort = getSort(desc)

    const pivot = arr[p]
    let i = p
    for (let j = p + 1; j <= q; j++) {
      const cur = arr[j]
      if (sort(cur, pivot)) {
        i++
        if (i !== j) {
          swap(arr, i, j)
        }
      }
    }

    if (i !== p) {
      swap(arr, p, i)
    }

    return i
  }

  function realQuickSort(arr, p, q) {
    if (p >= q) {
      return
    }

    const pos = partition(arr, p, q)
    realQuickSort(arr, p, pos - 1)
    realQuickSort(arr, pos + 1, q)
  }

  if (noNeedSort(arr)) {
    return
  }

  realQuickSort(arr, 0, arr.length - 1)
}

function bucket (arr, bucketSize = 5, desc = false) {
  if (noNeedSort(arr)) {
    return
  }

  const { min, max } = findExtremeValue(arr)

  // 算出桶的数量并初始化
  const bucketCount = Math.floor((max - min) / bucketSize) + 1
  const bucketArr = []
  for (let i = 0; i < bucketCount; i++) {
    bucketArr.push([])
  }

  // 把数据放到自己所在的桶里
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]
    let bucketPos
    if (desc) {
      bucketPos = Math.floor((max - cur) / bucketSize)
    } else {
      bucketPos = Math.floor((cur - min) / bucketSize)
    }
    bucketArr[bucketPos].push(cur)
  }

  // 遍历桶进行排序，并把结果拼接成排序好的数组
  let result = []
  for (let i = 0; i < bucketCount; i++) {
    const curArr = bucketArr[i]
    insert(curArr, desc)
    result = result.concat(curArr)
  }

  for (let i = 0; i < result.length; i++) {
    arr[i] = result[i]
  }
}

function counting (arr) {
  const { min, max } = findExtremeValue(arr)
  console.log(min + ', ' + max)

  // 把每个数字的个数写入一个cArr
  const cArr = []
  for (let i = min; i <= max; i++) {
    cArr[i] = 0
  }
  arr.forEach((e, index) => {
    const pos = e - min
    cArr[pos]++
  })
  console.log(cArr)

  // 进行累加 c(k) = c(0) + ... + c(k - 1)
  cArr.reduce((prev, next, index) => {
    cArr[index] = prev + next
    return prev + next
  }, 0)

  console.log(cArr)

  const result = []
  for (let i = arr.length - 1; i >= 0; i--) {
    const cur = arr[i] // 3
    let count = cArr[cur] // 7

    result[count - 1] = cur // r[6] = 3
    cArr[cur]-- // c[3] = 6
  }

  for (let i = 0; i < result.length; i++) {
    arr[i] = result[i]
  }
}

module.exports = {
  bubble,
  insert,
  selection,
  merge,
  quick,
  bucket,
  counting,
}