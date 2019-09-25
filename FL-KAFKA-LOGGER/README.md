# FL Kafka Logger 

## Fl kafka logger require kafka-node.
### Install
```sh
npm install kafka-node fl-kafka-logger
```
### Usage
Fl kafka logger let you send data to kafka server.

* `host` - The Kafka REST Proxy host to publish to.
* `topic` - The Kafka topic to publish to.
* `partition` - kafka partition.


* `statusCode` - Network status code.
* `applicationName` - Application name for which data is being pushing.
* `methodName` - Method name from where you are publishing.
* `data` - Data that you want to publish to kafka server.


```js
const FlKafkaLogger = require('fl-kafka-logger');

var kafkaConfig = {
    "host": "localhost:9092",
    "topic": "test",
    "partition": 0
}
const FlLogger = new FlKafkaLogger(kafkaConfig);
const flKafkalogger = await FlLogger.logFlData(statusCode, applicationName, methodName, data);

console.log(flKafkalogger);
```