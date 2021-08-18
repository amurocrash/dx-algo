class Queue {
  constructor () {
    this.data = []
  }

  enqueue(e) {
    this.data.push(e)
  }

  dequeue() {
    return this.data.shift()
  }

  size () {
    return this.data.length
  }
}

class CirclularQueue {
  constructor (capacity) {
    this.data = []
    this.capacity = capacity ? capacity : 10
    this.length = 0
    this.head = 0
    this.tail = 0
  }

  size () {
    return this.length
  }

  enqueue(e) {
    if (this.length >= (this.capacity - 1)) {
      throw new Error('out of capacity')
    } else {
      this.data[this.tail] = e
      this.length++
      this.tail++
      if (this.tail === this.capacity) {
        this.tail = 0
      }
    }
  }

  dequeue () {
    if (this.length === 0) {
      return undefined
    } else {
      const res = this.data[this.head]
      this.head++
      this.length--
      return res
    }
  }

  print () {
    console.log('==============')

    let dataStr = '['
    for (let i = 0; i < this.length; i++) {
      let index = this.head + i
      if (index === this.capacity) {
        index = 0
      }
      dataStr += (i === this.length - 1) ? this.data[index] : this.data[index] + ','
    }

    console.log(dataStr + ']')
    console.log('head: ', this.head)
    console.log('tail: ', this.tail)
  }
}

module.exports = {
  Queue,
  CirclularQueue,
}