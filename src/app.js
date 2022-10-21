'use strict'

/**
 * Module variables
 * @private
 **/

const BinanceStream = require('./lib/BinanceStream.js')

/**
 * Main
 **/

const res = []
const markets = [
    { market: 'btcusdt@aggTrade', id: 1}
    //{ market: 'etcusdt@aggtrade', id: 2},
    //{ market: 'btcusdt@trade', id: 3},
    //{ market: 'etcusdt@trade', id: 4},
    //{ market: 'btcusdt@kline_1m', id: 5},
    //{ market: 'etcusdt@kline_1m', id: 6}
]

for (let i = 0; i < markets.length; i++) {
    const _ = markets[i]
    res.push(new BinanceStream(_.market, _.id)) 
}
