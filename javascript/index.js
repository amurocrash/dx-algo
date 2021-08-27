const { LinkedList, DLinkedList } = require('./linkedlist')
const Stack = require('./stack')
const { CirclularQueue } = require('./queue')
const Sorts = require('./sort')
const BinarySearch = require('./binary-search')
const SkipList = require('./skiplist')
const { HashTable, HashMap } = require('./hashtable')

function llTest () {
  // const list = new LinkedList()
  // const arr = [1, 2, 3, 5]
  // list.fromArray(arr)
  // list.print()

  // list.insert(4, 3)
  // list.print()

  // list.remove(3)
  // list.print()
  // list.remove(1)
  // list.print()

  // list.update(2, 3)
  // list.print()

  // list.reverse()
  // list.print()

  // const arr1 = [1, 3]
  // const arr2 = [2, 4]
  // const list1 = new LinkedList()
  // list1.fromArray(arr1)
  // const list2 = new LinkedList()
  // list2.fromArray(arr2)
  // LinkedList.merge(list1, list2)
  // list1.print()

  // const list = new LinkedList()
  // list.fromArray([1, 2, 3, 4, 5])
  // console.log(list.findMiddle())

  const arr = [4, 1, 3, 5, 2]
  const list = DLinkedList.fromArray(arr)
  list.print()
  list.insert(6)
  list.insert(0, 4, true)
  list.insert(7, 3)
  list.print()
}

function stackTest () {
  // 模拟计算表达式
  function oepration () {
    const numStack = new Stack()
    const operStack = new Stack()
    const compareMap = {
      0: ['+', '-'],
      1:  ['*', '/']
    }

    function advance (s) {
      return s.substring(1, s.length)
    }

    function isSingleNumber (s) {
      return /^[0-9]$/.test(s)
    }

    function comparePriority (oper1, oper2) {
      function getPriorty (oper) {
        let result = 0
        Object.keys(compareMap).forEach(key => {
          const index = compareMap[key].indexOf(oper)
          if (index !== -1) {
            result = key
            return true
          }
        })

        return result
      }

      const p1 = getPriorty(oper1)
      const p2 = getPriorty(oper2)

      return p1 > p2
    }

    function doOperation (num1) {
      if (operStack.size() > 0) {
        if (!num1) { 
          num1 = parseInt(numStack.pop(), 10)
        }
        const num2 = parseInt(numStack.pop(), 10)
        const oper = operStack.pop()

        switch (oper) {
          case '+':
            return doOperation(num1 + num2)
          case '-':
            return doOperation(num1 - num2)
          case '*':
            return doOperation(num1 * num2)  
          case '/':
            return doOperation(num1 / num2)
        } 
      } else {
        return num1
      }
    }

    let question = '4+5*8-6' // 15

    let result = undefined
    while(question) {
      const s = question[0]
      if (isSingleNumber(s)) {
        numStack.push(s)
        question = advance(question)
      } else {
        const topOper = operStack.peek()
        if (!topOper || comparePriority(s, topOper)) {
          operStack.push(s)
          question = advance(question)
        } else {
          debugger
          if (!result) {
            result = doOperation()
          } else {
            result = doOperation(result)
          }

          operStack.push(s)
          question = advance(question)
        }
      }
    }

    if (operStack.size() > 0) {
      if (!result) {
        reselt = doOperation()
      } else {
        result = doOperation(result)
      }
    }


    console.log(result)
  }

  // 模拟浏览器的后退和前进
  function browser () {
    const backStack = new Stack()
    const forwardStack = new Stack()

    function skip (url) {
      backStack.push(url)
      forwardStack.clear()
      return url
    }

    function onBack () {
      const url = backStack.pop()
      forwardStack.push(url)
      return url
    }

    function onFoward () {
      const url = forwardStack.pop()
      backStack.push(url)
      return url
    }

    function stackToString (stackName, stack) {
      let res = stackName + ': '
      if (stack.size() === 0) {
        res += 'is empty'
      } else {
        stack.forEach(e => {
          res += e + ','
        })
      }

      return res
    }

    function print () {
      console.log('====================')
      console.log(stackToString('backStack', backStack))
      console.log(stackToString('forwardStack', forwardStack))
    }

    skip('a')
    skip('b')
    skip('c')

    print()

    onBack()
    onBack()

    print()

    onFoward()

    print()

    skip('d')

    print()
  }

}

function queueTest () {
  const queue = new CirclularQueue(4)
  queue.print()

  queue.enqueue(0)
  queue.enqueue(1)
  queue.enqueue(2)
  // queue.enqueue(3)

  queue.print()

  queue.dequeue()
  queue.dequeue()
  queue.dequeue()

  queue.print()

  queue.enqueue(4)
  queue.enqueue(5)
  queue.print()
}

function sortTest () {
  let arr = [22, 5, 11, 41, 45, 26, 29, 10, 7, 8, 30, 27, 42, 43, 40]

  function bubbleTest () {
    Sorts.bubble(arr)
  }
  
  function insertTest () {
    Sorts.insert(arr, true)
  }

  function selectionTest () {
    Sorts.selection(arr)
  }

  function mergeTest () {
    Sorts.merge(arr, true)
  }

  function quickTest () {
    Sorts.quick(arr)
  }

  function bucketTest () {
    Sorts.bucket(arr, bucketSize = 5, true)
  }

  function countingTest () {
    arr = [2, 5, 3, 0, 2, 3, 0, 3]
    Sorts.counting(arr)
  }

}

function binarySearchTest () {
  const arr = [1, 3, 4, 5, 6, 8, 8, 8, 11, 18]
  console.log(BinarySearch.withArray(arr, 8, 'last-less'))
}

function skipListTest () {
  
  // const list = new SkipList()
  // for (let i = 1; i <= 20; i++) {
  //   list.add(i)
  // }
  
  const arr = [1, 6, 9, 3, 5, 7, 4, 8]
  const list = SkipList.fromArray(arr)

  list.print()
}

function hashTableTest () {
  const keys = ['amuro', 'kamiu', 'char', 'judo', 'haman']

  // const table = new HashTable()
  // for (let i = 0; i < keys.length; i++) {
  //   table.set(keys[i], keys[i])
  // }
  // table.print()
  const map = new HashMap()
  for (let i = 0; i < 24; i++) {
    map.set(i.toString(), 'dx' + i)
  }

  map.print()
  // debugger
  console.log(map.get('15'))
  console.log(map.get('20'))
}

void function() {
  hashTableTest()
}()