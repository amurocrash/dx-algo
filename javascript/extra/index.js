const { Heap } = require('../heap')
const { quick } = require('../sort')

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/**
 * [1, 2, 3] => [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
 * 递归公式：f(n) = f(1, f(n - 1)) + f(2, f(n - 1)) + ... + f(n, f(n - 1))
 * 递归结束条件：f(2) = f(1, 2) + f(2, 1)
 */
function permutations (arr) {
  function invoke (arr, left, right) {
    if (right - left === 1) {
      return [[arr[left], arr[right]], [arr[right], arr[left]]]
    }

    const result = []
    for (let i = left; i <= right; i++) {
      const current = [arr[i]]
      swap(arr, left, i)

      const prevArrs = invoke(arr, left + 1, right)
      prevArrs.forEach(prevArr => {
        result.push(current.concat(prevArr))
      })

      swap(arr, left, i)
    }

    return result
  }

  return invoke(arr, 0, arr.length - 1)
}

/**
 * 1 个细胞的生命周期是 3 小时，1 小时分裂一次。求 n 小时后，容器内有多少细胞？
 * f(n) = f(n - 1) * 2 - f(n - 4)
 * f(0) = 1
 * f(1) = 2
 * f(2) = 4
 * f(3) = 8
 * f(4) = 16 - 1 = 15
 * f(5) = 30 - 2 = 28
 */
function cellDivision (n) {
  if (n === 0) {
    return 1
  }

  if (n <= 3) {
    return 2 * cellDivision(n - 1)
  }

  if (n >= 4) {
    return 2 * cellDivision(n - 1) - cellDivision(n - 4)
  }
}

function findTopK (arr, k) {
  if (k >= arr.length) {
    return arr
  }

  const heap = new Heap(true)
  arr.forEach(e => {
    if (heap.getSize() === k) {
      if (e > heap.getTop()) {
        heap.extract()
        heap.add(e)
      }
    } else {
      heap.add(e)
    }
  })

  return heap.getDataCopy()
}

/**
 * 使用两个堆动态输出数组的中位数，左边为最大堆，右边为最小堆，中位数为最大堆的top
 */
class MedianManager {
  constructor (arr) {
    this.size = arr.length

    quick(arr)
    const midIndex = this.getMidIndex() // 偶数为中间6 => 3, 奇数为中间+1, 7 => 4
    this.heapLeft = new Heap()
    this.heapRight = new Heap(true)
    arr.forEach((e, index) => {
      if ((index + 1) <= midIndex) {
        this.heapLeft.add(e)
      } else {
        this.heapRight.add(e)
      }
    })
  }

  getMidIndex () {
    return Math.ceil(this.size / 2)
  }

  getValue () {
    return this.heapLeft.getTop()
  }

  add (e) {
    const value = this.heapLeft.getTop()
    if (e <= value) {
      this.heapLeft.add(e)
    } else {
      this.heapRight.add(e)
    }
    this.size++

    this.keepBalance()
  }

  keepBalance () {
    const midIndex = this.getMidIndex()

    if (this.heapLeft.size > midIndex) {
      const topLeft = this.heapLeft.extract()
      this.heapRight.add(topLeft)
    } else if (this.heapRight.size > (this.size - midIndex)) {
      const topRight = this.heapRight.extract()
      this.heapLeft.add(topRight)
    }
  }
}

module.exports = {
  permutations,
  cellDivision,
  findTopK,
  MedianManager,
}