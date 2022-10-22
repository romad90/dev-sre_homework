# challenge 

## Prerequisites:
- It must run on node.js (latest LTS version)
- No binance/crypto related libraries allowed
- A maximum of 2 external libraries are allowed (the less the better) (Sub-dependencies do not count here)
- Execute below tasks on main-net (api.binance.com & wss://stream.binance.com)
- Unit tests/any form of testing for the below tasks is completely optional
- SPOT documentation available at https://binance-docs.github.io/apidocs/spot/en/#change-log
- 
## Task:
1. Open 1 "empty" websocket and then LIVE SUB-scribe to 2 trade streams, 2 aggTrade streams and 2 kline streams
2. Measure websocket event time => client receive time latency for each specific stream and print min/avg/max (optimize for high throughput) to console every 1 min

## Context

Binance trading platerform aims to provide the same degree of customer service to users all over the world. To achieve that, a distributed system application is the way to go by replicate cluster of applications to every geographical critical locations to reduce latency.

## Approach
Quick reminder, network latency is the time it takes for data or a request to go from the source to the destination. Latency in networks is measured in milliseconds. The closer your latency is to zero, the better.

Taking a step back, and emphasizing the design, the general purpose of this challenge is to be able to measure the latency on any Binance WebSocket streams. We only have information allowing us to connect to these market flows.

To do so, we will rely on ping-pong events implemented, allowing Binance WebSocket servers to be informed that clients are still connected and they can continue to receive market flows.

To process the volumetry of the data, we will rely on MaxHeap and MinHeap to know at any time, the maximum and minimum latency observed. Using this data structure allows us to be reactive, and also gives us room for options if we need for example to know what the kth max or min latency is. We will sum up all the network latencies observed to compute the average.

## How to setup

```
git clone https://github.com/romad90/dev-sre_homework.git
cd dev-sre_homework
yarn install
yarn run start              # By default, the script will run during 10 minutes and stop. You can specify an integer in minutes. Ex: yarn run start 25`
```
