const { Kafka } = require('kafkajs');
const broker = process.env.BROKER;

(async () => {
  const kafka = new Kafka({
    clientId:"tdef",
    brokers: [broker]
  })
  const consumer = kafka.consumer({groupId: "test"});
  await consumer.connect();
  await consumer.subscribe({
    topic: "records",
    fromBeginning: true
  });
  await consumer.run({
    eachMessage: async result => {
      console.log(
        `topic: ${result.topic}, partition: ${result.partition}, 
        message: ${result.message.value.toString()}`);
    }
  });
})()