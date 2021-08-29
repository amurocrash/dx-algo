class TNode {
  constructor (e, left = null, right = null) {
    this.e = e
    this.left = left
    this.right = right
  }
}

class BinaryTree {
  static fromArray (arr) {
    if (!arr || arr.length === 0) {
      return null
    }

    //       1 
    //    2     3  
    //  4   5 6   7
    //8
    const tree = new BinaryTree()
    tree.size = arr.length
    let lastLevelNodes
    let nextLevelNodes = []
    arr.forEach(e => {
      if (!tree.root) {
        tree.root = new TNode(e)
        lastLevelNodes = [tree.root]  
      } else {

        if (lastLevelNodes.length === 0) {
          lastLevelNodes = nextLevelNodes
          nextLevelNodes = []
        }

        const node = lastLevelNodes[0]

        if (!node.left) {
          node.left = new TNode(e)
          nextLevelNodes.push(node.left)
        } else {
          node.right = new TNode(e)
          nextLevelNodes.push(node.right)
          lastLevelNodes.shift()
        }
      }
    })

    return tree
  }

  constructor () {
    this.size = 0
  }

  bfs (cb) {
    const queue = []
    queue.push(this.root)
    let node
    while (node = queue.shift()) {
      const r = cb(node)
      if (r) {
        break
      }

      if (node.left) {
        queue.push(node.left)
      }

      if (node.right) {
        queue.push(node.right)
      }
    }
  }

  pre (cb) {
    function realPre (node) {
      if (node) {
        cb(node)
        realPre(node.left)
        realPre(node.right)
      }
    }

    realPre(this.root)
  }

  in (cb) {
    function realIn (node) {
      if (node) {
        realIn(node.left)
        cb(node)
        realIn(node.right)
      }
    }

    realIn(this.root)
  }

  post (cb) {
    function realPost (node) {
      if (node) {
        realPost(node.left)
        realPost(node.right)
        cb(node)
      }
    }

    realPost(this.root)
  }

  toLevels () {
    let currentQueue = []
    let nextQueue = []
    const levels = []
    currentQueue.push(this.root)

    let level = 0
    
    while (currentQueue.length > 0) {
      const node = currentQueue.shift()
      if (!levels[level]) {
        levels[level] = []
      }
      levels[level].push(node)

      if (node.left) {
        nextQueue.push(node.left)
      }

      if (node.right) {
        nextQueue.push(node.right)
      }

      if (currentQueue.length === 0) {
        level++
        currentQueue = nextQueue
        nextQueue = []
      }
    }

    return levels
  }
}

class BinarySearchTree extends BinaryTree {

  static fromArray (arr) {
    if (!arr || arr.length === 0) {
      return null
    }

    const tree = new BinarySearchTree()
    arr.forEach(e => {
      tree.add(e)
    })

    return tree
  }

  add (e) {
    function realAdd(node) {
      if (!node) {
        node = new TNode(e)
      } else {
        if (e > node.e) {
          node.right = realAdd(node.right)
        } else {
          node.left = realAdd(node.left)
        }
      }

      return node
    }

    this.root = realAdd(this.root)
    this.size++
  }

  find (e) {
    function realFind (node) {
      if (node) {
        if (e === node.e) {
          return node
        } else if (e < node.e) {
          return realFind(node.left)
        } else {
          return realFind(node.right)
        }
      }
    }

    return realFind(this.root)
  }

  removeMin (node) {
    if (!node) {
      return {
        link: null,
        node: null
      }
    }

    if (node.left) {
      if (node.left.left) {
        return this.removeMin(node.left)
      } else {
        const temp = node.left
        node.left = null
        return {
          link: node,
          node: temp
        }
      }
    } else {
      return {
        link: null,
        node
      }
    }
  }

  remove (e) {
    const realRemove = (node) => {
      if (node) {
        if (e === node.e) {
          this.size--
          if (!node.left && !node.right) {
            return null
          } else {
            if (node.left && !node.right) {
              return node.left
            } else if (!node.left && node.right) {
              return node.right
            } else {
              // 右子树中的最小节点，把它替换到要删除的节点上。然后再删除掉这个最小节点
              const { link, node: minNodeInRight } = this.removeMin(node.right)
              minNodeInRight.left = node.left
              minNodeInRight.right = link
              return minNodeInRight
            } 
          }
        } else {
          if (e < node.e) {
            node.left = realRemove(node.left)
          } else {
            node.right = realRemove(node.right)
          }
          return node
        } 
      }
    }

    this.root = realRemove(this.root)
  }
}

module.exports = {
  BinaryTree,
  BinarySearchTree
}