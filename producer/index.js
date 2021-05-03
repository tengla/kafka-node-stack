const { Kafka } = require('kafkajs');
const dns = require('dns');
const createTopic = require('./create-topic');
const deleteTopic = require('./delete-topic');
const producerRun = require('./producer');

console.log("argv", process.argv);

const kafka = new Kafka({
  clientId: "tdef",
  brokers: [process.env.BROKER]
})

let n = 0;

const wait = async () => {
  try {
    const admin = kafka.admin()
    await admin.connect()
    await admin.disconnect()
  } catch (err) {
    n += 1;
    console.log(err);
    return setTimeout(wait, 1000)
  }
  run();
};

wait();

const run = async () => {
  const admin = kafka.admin()
  switch (process.argv[2]) {
    case "delete-topic":
      try {
        await admin.connect()
        await deleteTopic(admin)
      } catch (err) {
        console.log(err)
      }
      await admin.disconnect()
      break
    case "create-topic":
      try {
        await admin.connect()
        await createTopic(admin, 'records', 2)
      } catch (err) {
        console.log(err)
      }
      await admin.disconnect()
      break
    default:
      await admin.connect()
      try {
        await createTopic(admin, 'records', 2)
      } catch (err) {
        console.log(err)
      }
      await admin.disconnect()
      const producer = kafka.producer()
      await producer.connect()
      producerRun(producer);
  }
};
