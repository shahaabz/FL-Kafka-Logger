const kafka = require('kafka-node');

class FlKafkaLogger {

    constructor(kafkaConfig) {
        if (!kafkaConfig) throw new Error("Undefined Kafka config.");
        if (!kafkaConfig.host) throw new Error("Undefined kafka host.");
        if (!kafkaConfig.topic) throw new Error("Undefined kafka topic.");

        this.topic = kafkaConfig.topic;
        this.partition = !kafkaConfig.partition ? 0 : kafkaConfig.partition;
        const client = new kafka.KafkaClient({ kafkaHost: kafkaConfig.host });
        const Producer = kafka.Producer;
        this.producer = new Producer(client);
    }

    /**
     * @description Send data to kafka 
     * @param {Number} statusCode
     * @param {String} method
     * @param {String} appName
     * @param {JSON} data
     * @memberof FlKafkaLogger
     */
    logFlData(statusCode, methodName, appName, data) {
        return new Promise((resolve, reject) => {
            statusCode = statusCode ? statusCode : '';

            if (!methodName) return reject("undefined method name.");
            if (!appName) return reject("undefined application name.");
            if (!data) return reject("undefined data object.");

            let logData = {
                statusCode: statusCode,
                methodName: methodName,
                appName: appName,
                source: this.topic,
                metaData: data
            }

            let payloads = [{ topic: this.topic, messages: JSON.stringify(logData), partition: this.partition }];
            try {
                this.producer.on('ready', () => {
                    this.producer.send(payloads, (error, data) => {
                        if (error) {
                            return reject(error);
                        }
                        let response = { success: true, data: data }
                        return resolve(response);
                    });
                });
                this.producer.on('error', (error) => {
                    return reject(error);
                });
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = FlKafkaLogger;
