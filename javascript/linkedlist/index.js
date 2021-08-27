class Node {
  constructor (e, next) {
    this.e = e
    this.next = next
  }
}

class LinkedList {
  constructor () {
    this.header = null
  }

  fromArray (arr) {
    let cur
    arr.forEach(e => {
      if (!this.header) {
        this.header = new Node(e)
        cur = this.header
      } else {
        cur.next = new Node(e)
        cur = cur.next
      }
    })
  }

  forEach (cb) {
    let cur = this.header
    while (cur) {
      const r = cb(cur)
      if (r) {
        break
      }
      cur = cur.next
    }
  }

  insert (e, old) {
    if (old) {
      // 插入到指定元素后面
      const oldNode = this.find(old)
      if (oldNode) {
        const newNode = new Node(e)
        newNode.next = oldNode.next
        oldNode.next = newNode
      }
    } else {
      // 插入到当前最后的元素后面
      const last = this.find()
      if (!last) {
        this.header = new Node(e)
      } else { 
        last.next = new Node(e)
      }
    }
  }

  insertBefore (e, old) {
    const node = this.findPrev(old)
    if (node == null) {
      let temp = this.header
      this.header = new Node(e)
      this.header.next = temp
    } else {
      node.next = new Node(e, node.next)
    }
  }

  remove (e) {
    const prev = this.findPrev(e)
    if (prev == null) {
      this.header = this.header.next
    } else {
      const cur = prev.next
      prev.next = cur.next
    }
  }

  removeIndex (i) {
    let cur = this.header
    for (let j = 0; j < i; j++) {
      if (cur) {
        cur = cur.next
      } else {
        break
      }
    }

    if (cur) {
      this.remove(cur.e)
    }
  }

  removeReverseIndex (i) {
    this.reverse()
    this.removeIndex(i)
    this.reverse()
  }

  update (e, newE) {
    this.find(e).e = newE
  }

  find (e) {
    let node
    if (e) {
      // 传e的时候查询e是否存在
      this.forEach(cur => {
        if (cur.e === e) {
          node = cur
          return true
        }
      })
    } else {
      // 不传e的时候返回最后一个元素
      this.forEach(e => {
        node = e
      })
    }

    return node
  }

  findPrev (e) {
    if (!e) {
      throw new Error('')
    }

    if (!this.header) {
      throw new Error('')
    }

    let pre = null
    this.forEach(node => {
      if (node.e === e) {
        return true
      } else {
        pre = node
      }
    })

    return pre
  }

  findMiddle () {
    let slow = this.header
    let fast = this.header
    
    while (fast && fast.next) {
      fast = fast.next.next
      slow = slow.next
    }

    return slow
  }

  print () {
    let result = ''
    this.forEach(node => {
      result += node.e + ','
    })

    console.log(result)
  }

  reverse () {
    let prev = null

    this.forEach(node => {
      const temp = prev
      prev = new Node(node.e)
      prev.next = temp
    })

    this.header = prev
  }

  hasCircle () {
    if (!this.header) {
      return false
    }

    let fast = this.header
    let slow = this.header

    while (fast && fast.next) {
      fast = fast.next.next
      slow = slow.next

      if (fast === slow) {
        return true
      }
    }

    return false
  }

  static merge(list1, list2) {
    let cur1 = list1.header
    let cur2 = list2.header

    while(cur2) {
      const e2 = cur2.e

      if (cur1 == null) {
        list1.insert(e2)
        cur2 = cur2.next
        continue
      }

      const e1 = cur1.e
      if (e2 <= e1) {
        list1.inertBefore(e2, e1)
        cur2 = cur2.next // 此时cur1仍然指向e1那个更大的元素
      } else {
        cur1 = cur1.next
        while(cur1) {
          const e1 = cur1.e
          if (e1 > e2) {
            list1.insertBefore(e2, e1)
            cur2 = cur2.next
            break
          } else {
            cur1 = cur1.next
          }
        }
      }
    }
  }
}

class DNode {
  constructor (e, prev, next) {
    this.e = e
    this.prev = prev
    this.next = next
  }
}

class DLinkedList {
  static fromArray (arr) {
    const list = new DLinkedList()
    if (arr && arr.length > 0) {
      let curNode = list.header
      arr.forEach(e => {
        if (!list.header) {
          curNode = list.header = new DNode(e)
        } else {
          curNode.next = new DNode(e, curNode)
          curNode = curNode.next
        }
      })
    }

    return list
  }

  forEach (cb) {
    let curNode = this.header
    let index = 0
    while(curNode) {
      const r = cb(curNode, index++)
      if (r === true) {
        break
      } else {
        curNode = curNode.next
      }
    }
  }

  insert (e, target, isBefore = false) {
    // 直接插入链表尾部
    if (!target) {
      const tail = this.findTail()
      if (!tail) {
        this.header = new DNode(e)
      } else {
        tail.next = new DNode(e, tail)
      }
      return
    }

    // 找到对应节点，根据参数插入前面或者后面
    const nodeForInsert = this.find(target)
    if (nodeForInsert) {
      if (isBefore) {
        const beforeNode = nodeForInsert.prev
        if (!beforeNode) {
          this.header = new DNode(e, null, nodeForInsert)
        } else {
          beforeNode.next = new DNode(e, beforeNode, nodeForInsert)
        }
      } else {
        const afterNode = nodeForInsert.next
        nodeForInsert.next = new DNode(e, nodeForInsert, afterNode)
      }
    }
  }

  remove (e) {
    const nodeForRemove = this.find(e)
    if (nodeForRemove) {
      const prev = nodeForRemove.prev
      if (!prev) {
        this.header = this.header.next
      } else {
        const next = this.nodeForRemove.next
        prev.next = next
        next.prev = prev
      }
    }
  }

  update (e, target) {
    const node = this.find(target)
    if (node) {
      node.e = e
    }
  }

  find (target) {
    let findNode
    this.forEach(node => {
      if (node.e === target) {
        findNode = node
        return true
      }
    })

    return findNode
  }

  findTail () {
    if (!this.header) {
      return null
    }
    let tail
    this.forEach(node => {
      if (!node.next) {
        tail = node
      }
    })

    return tail
  } 

  print () {
    let str = ''
    this.forEach(node => {
      str += `${node.e}->`
    })

    if (str === '') {
      console.log('list is empty')
    } else {
      str += 'null'
      console.log(str)
    }
  }
}

module.exports = {
  LinkedList,
  DLinkedList
}