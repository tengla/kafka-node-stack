const { Kafka } = require('kafkajs');


const opts = {
  clientId: "tdef",
  brokers: [process.env.BROKER]
}

const kafka = new Kafka(opts)

let n = 0;

const wait = (fn) => {
  const inner = async () => {
    try {
      const consumer = kafka.consumer({ groupId: "test" })
      await consumer.connect()
      await consumer.disconnect()
    } catch (err) {
      n += 1;
      console.log(err)
      return setTimeout(inner, 1000)
    }
  }
  inner();
  fn();
};

const run = async () => {

  const consumer = kafka.consumer({ groupId: "test" });
  await consumer.connect();
  await consumer.subscribe({
    topic: "trains",
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

run();
