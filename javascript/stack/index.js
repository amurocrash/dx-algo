class Stack {
  constructor () {
    this.data = []
  }

  pop () {
    return this.data.pop()
  }

  push (e) {
    return this.data.push(e)
  }

  peek () {
    return this.data[0]
  }

  size () {
    return this.data.length
  }

  forEach (cb) {
    this.data.forEach(e => {
      cb(e)
    })
  }

  clear () {
    while (this.data.length > 0) {
      this.data.pop()
    }
  }
}

module.exports = Stack