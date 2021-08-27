const MAX_LEVEL = 8
const PROBABILITY = 0.5

class SNode {
  constructor (e) {
    this.e = e
    this.nexts = []
  }

  next (level) {
    return this.nexts[level]
  }
}

class SkipList {
  static fromArray (arr) {
    if (!arr) {
      return null
    }

    const list = new SkipList()
    arr.forEach(e => {
      list.add(e)
    })

    return list
  }

  constructor () {
    this.size = 0
    this.curLevel = 0
    this.header = new SNode(null)
  }

  add (e) {
    let level = this.randomLevel()
    if (level > this.curLevel) {
      this.curLevel = level
    }

    const newNode = new SNode(e)
    let currentNode = this.header

    while (level >= 0) {
      currentNode = this.findPosForAdd(e, currentNode, level)
      newNode.nexts[0] = currentNode.next(level)
      currentNode.nexts[level] = newNode
      level--
    }

    this.size++
    return true
  }

  findPosForAdd (e, currentNode, level) {
    let nextNode = currentNode.next(level)
    while (nextNode) {
      if (e < nextNode.e) {
        break
      }
      currentNode = nextNode
      nextNode = currentNode.next(level)
    }

    return currentNode
  } 

  /**
   * 该算法的意思是返回1的概率是1/2
   * 返回2的概率是1/4
   * 返回3的概率是1/8
   * 依此类推。
   * 
   * 看成一个分布的话，第0层包含所有节点，第1层含有1/2个节点，第2层含有1/4个节点…
   */
  randomLevel () {
    let level = 0
    while (Math.random() < PROBABILITY && level < MAX_LEVEL - 1) {
      ++level
    }

    return level
  }

  print () {
    const headerLevels = this.header.nexts
    // 从level高的开始打印
    for (let level = headerLevels.length - 1; level >= 0; level--) {
      const header = headerLevels[level]
      let result = 'h -> '
      let cur = header.next(level)
      while (cur) {
        result += `${cur.e} -> `
        cur = cur.next(level)
      }
      if (result !== 'h -> ') {
        result += 'null'
        console.log(result)
      }
    }
  }
}

module.exports = SkipList