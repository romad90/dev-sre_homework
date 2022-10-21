'use strict'

/**
 * Heap Interface
 */

class AbstractHeap {
    constructor(cmp) {
        if (this.constructor.name === 'AbstractHeap') {
            throw new Error('AbstractHeap cannot be instancied!')
        }

        if (typeof cmp !== 'function') {
            throw new Error('cmp must be a function!')
        }

        this.cmp = cmp
        this.storage = ['\x00']
    }
 
    getParentIndex(index) {
        return Math.floor(index/2)
    }
    getLeftChildIndex(index) {
        return Math.floor(index*2)
    }
    getRightChildIndex(index) {
        return Math.floor((index*2)+1)
    }
    
    hasParent(index) {
        return this.getParentIndex(index) >= 1
    }
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.storage.length
    }
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.storage.length
    }

    getParent(index) {
        return this.storage[this.getParentIndex(index)]
    }
    getRightChild(index) {
        return this.storage[this.getRightChildIndex(index)]
    }
    getLeftChild(index) {
        return this.storage[this.getLeftChildIndex(index)]
    }
    
    swap(index1, index2) {
        [this.storage[index1], this.storage[index2]] = [this.storage[index2], this.storage[index1]] 
    }

    heapifyUp() {
        let index = this.storage.length - 1
        while (this.hasParent(index) && this.cmp(this.storage[index], this.getParent(index))) {
            const parentIndex = this.getParentIndex(index)
            this.swap(index, parentIndex)
            index = parentIndex
        }
    }
    
    insert(val) {
        if (typeof val !== 'number') {
            throw new Error('val must be a number!')
        }

        this.storage.push(val)
        this.heapifyUp()
        return this
    }
    peek () {
        if (this.size() === 0) {
            throw new Error(`${this.constructor.name} is empty!`)
        }

        return this.storage[1]
    }
    remove() {
        const currentMin = this.storage[1]
        this.storage[1] = this.storage.pop()
        this.heapifyDown()
        return currentMin
    }
    heapifyDown() {
        let index = 1

        while (this.hasLeftChild(index)) {
            let smallerIndex = this.getLeftChildIndex(index)

            if (this.hasRightChild(index) && this.cmp(this.getRightChild(index), this.storage[smallerIndex])) {
                smallerIndex = this.getRightChildIndex(index)
            }

            if (this.cmp(this.storage[index], this.storage[smallerIndex])) {
                break
            }
            else {
                this.swap(index, smallerIndex)
                index = smallerIndex
            }
        }
    }
    values() {
        return this.storage.slice(1)
    }
    size () {
        return this.storage.length - 1
    }
    heapSort() {
        const _ = Object.create(this);
        const res = [], len =_.size()
        
        for (let i = 0; i < len; i++) {
            res.push(_.remove())
        }
        return res
    }
}

class MinHeap extends AbstractHeap {
    constructor () {
        super((a, b) => a < b)
    }
}


class MaxHeap extends AbstractHeap {
    constructor () {
        super((a, b) => a > b)
    }
}

/**
 * Module exports
 * @public
 *
 **/
module.exports = {
    MinHeap,
    MaxHeap
}
