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
const ACTIVITY_PERIOD = process.argv[2] && typeof +process.argv[2] === 'number' ? 60000 * process.argv[2]  : 60000 * 10
const PRINT_INTERVAL = 60000
const PING_INTERVAL = 60000 / 5.5
const { MaxHeap, MinHeap } = require('./Heap.js')

console.info(`OBSERVATION PERIOD: ${ACTIVITY_PERIOD/60000} minutes.`)

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
    }
    connect(cb) {
        if (cb && typeof cb !== 'function') {
            throw new Error('cb must be a function')
        }
        this.socket.on('open', () => {
            console.info(`empty websocket created to :: ${URL}`)
            setTimeout(() => {
                performance.mark('X')
                this.socket.send(JSON.stringify({
                    "method": "SUBSCRIBE",
                    "params":[
                        `${this.market}`
                    ],
                    "id": this.id
                }))
            }, 3000)
        })

        this.socket.on('message', (msg) => {
            if (this.cnt === 0) {
                performance.mark('Y')
            }
            const data = JSON.parse(msg.toString())
            
            if (this.cnt === 0 && data && data.result === null) {
                const duration = performance.measure('latency', 'X', 'Y').duration
                this.maxHeap.insert(duration)
                this.minHeap.insert(duration)
                this.rawLatencies.push(duration)
                this.sumLatencies += duration
                this.i++
                console.info(`LIVE subscribing to ${this.market} OK in ${duration} ms`)
                if (cb) {
                    cb(null)
                }
            } else if (data.code) {
                console.error(data)
                this.socket.close(1)
            }
            this.cnt++
        })

        this.socket.on('error', (err) => {
            console.error(err)
        })

        this.socket.on('close', () => {
            console.info(`disconnected from :: ${this.market}.`)
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
        

        //in order to make x ping call < 6/min, to not spam the Websocket server.
        this.pingInterval = setInterval(() => {
           performance.mark('A')
           this.socket.ping()
        }, PING_INTERVAL)

        this.printInterval = setInterval(() => {
           console.log(`${this.market} ==> maxLatency: ${this.getMax()} ms, minLatency:${this.getMin()} ms, avgLatency: ${this.getAvg()} ms. Next report in 1 minute...`)
           //console.log(this.rawLatencies)
           //console.log("\n")
        }, PRINT_INTERVAL)

        setTimeout(() => {
            this.socket.close(1000)
        }, ACTIVITY_PERIOD)


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
