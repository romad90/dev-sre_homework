'use strict'

/**
 * Module dependecies
 * @private
  **/

const { performance } = require('perf_hooks')
const WebSocket = require('ws')
 
/**
 * Module variables
 * @private
 **/

const URL = `wss://stream.binance.com:9443/ws`
const { MaxHeap, MinHeap } = require('./Heap.js')

/**
 * Stream: wrapper to connect to any Binance market streams and collects latencies every 5times/min.
 *
 **/

class BinanceStream {
    constructor(market, id) {
        this.pingInterval
        this.printInterval
        this.market = market
        this.socket = new WebSocket(URL)
        this.id = id
        this.cnt = 0
        this.i = 0
        this.maxHeap = new MaxHeap()
        this.minHeap = new MinHeap()
        this.rawLatencies = []
        this.sumLatencies = 0

        this.socket.on('open', () => {
            console.info(`empty websocket created to :: ${URL}`)
            setTimeout(() => {
                this.socket.send(JSON.stringify({
                    "method": "SUBSCRIBE",
                    "params":[
                        `${market}`
                    ],
                    "id": this.id
                }))
            }, 3000)
        })

        this.socket.on('message', (msg) => {
            const data = JSON.parse(msg.toString())

            if (this.cnt === 0 && data && data.result === null) {
                console.info(`LIVE subscribing to ${market} OK`)
            }
            this.cnt++
        })

        this.socket.on('error', (err) => {
            console.error(err)
        })

        this.socket.on('close', () => {
            console.info(`disconnected from :: ${market}.`)
            console.info(`counter: ${this.cnt} sockets received.`)
            clearInterval(this.pingInterval)
            clearInterval(this.printInterval)
        })   

        this.socket.on('pong', (e) => {
            performance.mark('B')
            const duration = performance.measure('latency', 'A', 'B').duration
            this.maxHeap.insert(duration)
            this.minHeap.insert(duration)
            this.rawLatencies.push(duration)
            this.sumLatencies += duration
            this.i++
        })

        this.socket.on('ping', (e) => {
            this.socket.pong()
        }) 
        
        this.pingInterval = setInterval(() => {
           performance.mark('A')
           this.socket.ping()
        }, 60000/5)

        this.printInterval = setInterval(() => {
           console.log(`${this.market} ==> maxLatency: ${this.getMax()} ms, minLatency:${this.getMin()} ms, avgLatency: ${this.getAvg()} ms. Next report in 1 minute...`)
        }, 60000)

        setTimeout(() => {
            this.socket.close(1000)
        }, 60000 * 10)
    }
    getMax () {
        return this.maxHeap.peek()
    }
    getMin () {
        return this.minHeap.peek()
    }
    getAvg () {
        return (this.sumLatencies/this.i)
    }
}


/**
 * Module exports
 * @public
 **/

module.exports = BinanceStream
