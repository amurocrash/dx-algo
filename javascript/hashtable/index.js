class HashTable {
  constructor () {
    this.table = []
  }

  // 把字符的ascii相加作为hash key
  hash (key) {
    let code = 0
    for (let i = 0; i < key.length; i++) {
      code += key.charCodeAt(i)
    }

    return code % 37
  }

  set (key, value) {
    this.table[this.hash(key)] = value
  }

  get (key) {
    return this.table[this.hash(key)]
  }

  remove (key) {
    const code = this.hash(key)
    const e = this.table[code]
    this.table[code] = undefined
    return e
  }

  print () {
    let str = ''
    this.table.forEach((e, index) => {
      if (e !== undefined) {
        if (index === this.table.length - 1) {
          str += (index + ' : ' + e)
        } else {
          str += (index + ' : ' + e) + ', '
        }
      } 
    })

    console.log(str)
  }
}

class Node {
  constructor (e, next = null) {
    this.e = e
    this.next = next
  }
}

class LinkedList {
  add (e) {
    if (!this.header) {
      this.header = new Node(e)
    } else {
      let cur = this.header
      while (cur.next) {
        cur = cur.next
      }

      cur.next = new Node(e)
    }
  }

  find (key) {
    let value
    this.forEach(node => {
      if (node.e.key === key) {
        value = node.e.value
        return true
      }
    })

    return value
  }

  forEach (cb) {
    let cur = this.header
    while (cur) {
      const r = cb(cur)
      if (r) {
        break
      } else {
        cur = cur.next
      }
    }
  }

  toString () {
    let str = ''
    this.forEach(node => {
      str += `<${node.e.key}, ${node.e.value}> -> `
    })

    str += 'null'

    return str
  }
}

class HashMap {
  constructor () {
    this.size = 0
    this.capacity = 16
    this.factor = 0.8
    this.table = new Array(this.capacity)
  }

  hash (str){
    //定义一个变量来存储hashCode
    let hashCode = 0

    // 利用霍纳法则计算出hashCode的值
    // give -> Unicode编码
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i)
    }

    // 利用hashCode与哈希表的长度取余得到下标值
    let index = hashCode % this.capacity

    return index
  }


  set (key, value, isAdd = true) {
    const code = this.hash(key)
    let list = this.table[code]
    if (!list) {
      list = new LinkedList()
      this.table[code] = list
    }

    list.add({ key, value })

    if (isAdd) {
      this.size++
      this.expansion()
    }
  }

  get (key) {
    const code = this.hash(key)
    return this.table[code].find(key)
  }

  expansion () {
    const currentFactor = this.size / this.capacity
    if (currentFactor >= this.factor) {
      this.capacity *= 2
      this.transferData()
    }
  }

  transferData () {
    const lastTable = this.table
    const newTable = new Array(this.capacity)
    this.table = newTable
    lastTable.forEach(list => {
      if (list) {
        list.forEach(node => {
          this.set(node.e.key, node.e.value, false)
        })
      }
    })
  }

  print () {
    this.table.forEach((list, index) => {
      if (list) {
        console.log(index + ': ' + list.toString())
      }
    })
  }
}

module.exports = {
  HashTable,
  HashMap
}