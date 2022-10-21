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

## Strategy
