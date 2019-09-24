const kafka = require('kafka-node');
exports.logFlData = (kafkaConfig, data) => {
    return new Promise((resolve, reject) => {
        if (kafkaConfig == undefined) return reject("Undefined Kafka config.");
        if (kafkaConfig.host == undefined) return reject("Undefined kafka host.");
        if (kafkaConfig.topic == undefined) return reject("Undefined kafka topic.");
        if (kafkaConfig.partition == undefined) kafkaConfig.partition = 0;
        const client = new kafka.KafkaClient({ kafkaHost: kafkaConfig.host });
        let Producer = kafka.Producer;
        // let KeyedMessage = kafka.KeyedMessage;
        let producer = new Producer(client);
        // let km = new KeyedMessage('key', 'message');
        let payloads = [{ topic: kafkaConfig.topic, messages: data, partition: kafkaConfig.partition }];
        try {
            producer.on('ready', () => {
                producer.send(payloads, (error, data) => {
                    if (error) {
                        throw new Error(error);
                    }
                    let response = { success: true, data: data }
                    return resolve(response);
                });
            });
            producer.on('error', (error) => {
                return reject(error);
            });
        } catch (error) {
            return reject(error);
        }
    });
}