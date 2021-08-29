function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

class Heap {
  static fromArray (arr, desc = false) {
    if (!arr || arr.length === 0) {
      return null
    }

    const heap = new Heap(desc)
    arr.forEach(e => {
      heap.add(e)
    })

    return heap
  }

  /**
   * 
   * @param {*} desc 最大堆false，最小堆true，默认最大堆
   */
  constructor (desc = false) {
    this.data = []
    this.size = 0
    this.desc = desc
  }

  getSize () {
    return this.size
  }

  getTop () {
    return this.data[1]
  }

  getDataCopy () {
    const result = []
    for (let i = 1; i <= this.size; i++) {
      result.push(this.data[i])
    }

    return result
  }

  getParentPos (pos) {
    return Math.floor(pos / 2)
  }

  getLeftChildPos (pos) {
    return pos * 2
  }

  getRightChildPos (pos) {
    return pos * 2 + 1
  }

  add (e) {
    this.data[++this.size] = e
    this.heapify(this.size)
  }

  heapify (pos) {
    let parentPos = 0
    while ((parentPos = this.getParentPos(pos)) > 0) {
      const parent = this.data[parentPos]
      const e = this.data[pos]

      if ((!this.desc && e > parent) || (this.desc && e < parent)) {
        swap(this.data, pos, parentPos)
        pos = parentPos
      } else {
        break
      }
    }
  }

  shiftDown (pos) {
    let leftChildPos
    let rightChildPos
    while ((leftChildPos = this.getLeftChildPos(pos)) <= this.size) {
      const e = this.data[pos]
      const left = this.data[leftChildPos]
      let right
      if ((rightChildPos = this.getRightChildPos(pos)) <= this.size) {
        right = this.data[rightChildPos]
      }
      
      let final
      let finalPos
      if (right === undefined) {
        final = left
        finalPos = leftChildPos
      } else {
        if ((!this.desc && left >= right) || (this.desc && left <= right)) {
          final = left
          finalPos = leftChildPos
        } else {
          final = right
          finalPos = rightChildPos
        }
      }

      if ((!this.desc && e < final) || (this.desc && e > final)) {
        swap(this.data, pos, finalPos)
        pos = finalPos
      } else {
        break
      }
    }
  }

  extract () {
    if (this.size === 0) {
      return null
    }

    const max = this.data[1]

    const e = this.data[this.size--]
    this.data[1] = e
    this.shiftDown(1) 

    return max
  }

  print () {
    let result = '['
    for (let i = 1; i <= this.size; i++) {
      if (i === this.size) {
        result += this.data[i]
      } else {
        result += this.data[i] + ', '
      }
    }

    result += ']'
    console.log(result)
  }

  sort () {
    let result = []
    let e
    while (e = this.extract()) {
      result.push(e)
    }

    return result
  }
}

module.exports = {
  Heap
}