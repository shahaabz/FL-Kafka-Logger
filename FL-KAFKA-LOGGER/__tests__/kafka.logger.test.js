const FlKafkaLogger = require('../flKafkaLogger');

describe('testing beginCalling', () => {
	it('run', async () => {
		let kafkaConfig = {
			host: 'localhost:9092',
			topic: 'test',
			partition: 0
		};
		let statusCode = 200, methodName = "local test", appName = "kafka test", data = {loanCode: "somet",data: "someData"}
		const FlLogger = new FlKafkaLogger(kafkaConfig);
		const log = await FlLogger.logFlData(statusCode, methodName, appName, data);
		expect(log.success).toBe(true);
	});
});
