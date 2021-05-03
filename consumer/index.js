const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: "tdef",
  brokers: [process.env.BROKER]
})

let n = 0;

const wait = async () => {
  try {
    const consumer = kafka.consumer({ groupId: "test" })
    await consumer.connect()
    await consumer.disconnect()
  } catch (err) {
    n += 1;
    console.log(err);
    return setTimeout(wait, 1000)
  }
  run();
};

wait();

const run = async () => {

  const consumer = kafka.consumer({ groupId: "test" });
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
}