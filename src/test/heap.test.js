'use strict'

/**
 * Module dependencies
 * @public
 *
 **/


/**
 * Module variables
 * @private
 *
 **/
const { MinHeap, MaxHeap } = require('../lib/Heap.js')

describe('MinHeap class', () => {
  test('create an MinHeap object, size() === 0', () => {
    const _ = new MinHeap()
    expect(_.size()).toBe(0)

  })
  test('inserting a non number, should throw an error: val must be a number!', () => {
    const _ = new MinHeap()
    try {
        _.insert('coucou')
    } catch (e) {
        expect(e.message).toBe("val must be a number!")
    }
  })

  test('peek() on an empty MinHeap object, should throw an error: MinHeap is empty!', () => {
    const _ = new MinHeap()
    try {
        _.peek()
    } catch (e) {
        expect(e.message).toBe("MinHeap is empty!")
    }
  })
 
  test('inserting a number, size() === 1', () => {
    const _ = new MinHeap()
    _.insert(2)
    expect(_.size()).toBe(1)
  })
  test('inserting 2 as a value, peek() === 2', () => {
    const _ = new MinHeap()
    _.insert(2)
    expect(_.peek()).toBe(2)
  })  

  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], size() === 12', () => {
    const _ = new MinHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(_.size()).toBe(12)
  })

  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], values() === [1,3,2,5,3,4,2,5,6,9,10,20] ', () => {
    const _ = new MinHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(JSON.stringify(_.values())).toBe(JSON.stringify([1,3,2,5,3,4,2,5,6,9,10,20]))
  })
  
  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], peek() === 1', () => {
    const _ = new MinHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(_.peek()).toBe(1)
  }) 

   test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], remove() === 1', () => {
    const _ = new MinHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(_.remove()).toBe(1)
  })

  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], then calling remove(), size() === 11', () => {
    const _ = new MinHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    _.remove()
    expect(_.size()).toBe(11)
  })
  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], then calling heapSort(), should return [1,2,2,3,3,4,5,5,6,9,10,20]', () => {
    const _ = new MinHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(JSON.stringify(_.heapSort())).toBe(JSON.stringify([1,2,2,3,3,4,5,5,6,9,10,20]))
  })
})

describe('MaxHeap class', () => {
  test('create an MaxHeap object, size() === 0', () => {
    const _ = new MaxHeap()
    expect(_.size()).toBe(0)

  })
  test('inserting a non number, should throw an error: val must be a number!', () => {
    const _ = new MaxHeap()
    try {
        _.insert('coucou')
    } catch (e) {
        expect(e.message).toBe("val must be a number!")
    }
  })

  test('peek() on an empty MaxHeap object, should throw an error: MaxHeap is empty!', () => {
    const _ = new MaxHeap()
    try {
        _.peek()
    } catch (e) {
        expect(e.message).toBe("MaxHeap is empty!")
    }
  })
 
  test('inserting a number, size() === 1', () => {
    const _ = new MaxHeap()
    _.insert(2)
    expect(_.size()).toBe(1)
  })
  test('inserting 2 as a value, peek() === 2', () => {
    const _ = new MaxHeap()
    _.insert(2)
    expect(_.peek()).toBe(2)
  })  

  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], size() === 12', () => {
    const _ = new MaxHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(_.size()).toBe(12)
  })

  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], values() === [20,10,4,5,9,3,2,2,5,3,6,1]', () => {
    const _ = new MaxHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(JSON.stringify(_.values())).toBe(JSON.stringify([20,10,4,5,9,3,2,2,5,3,6,1]))
  })
  
  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], peek() === 20', () => {
    const _ = new MaxHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(_.peek()).toBe(20)
  }) 

   test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], remove() === 1', () => {
    const _ = new MaxHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(_.remove()).toBe(20)
  })

  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], then calling remove(), size() === 11', () => {
    const _ = new MaxHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    _.remove()
    expect(_.size()).toBe(11)
  })
  test('inserting [3, 2, 20, 5, 3, 1, 2, 5, 6, 9, 10, 4], then calling heapSort(), should return [20,10,4,5,9,3,2,2,5,3,6,1]', () => {
    const _ = new MaxHeap()
    _.insert(3)
    _.insert(2)
    _.insert(20)
    _.insert(5)
    _.insert(3)
    _.insert(1)
    _.insert(2)
    _.insert(5)
    _.insert(6)
    _.insert(9)
    _.insert(10)
    _.insert(4)
    expect(JSON.stringify(_.heapSort())).toBe(JSON.stringify([20,10,9,6,5,5,4,3,3,2,2,1]))
  })
})
