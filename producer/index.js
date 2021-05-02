const { Kafka } = require('kafkajs');
const createTopics = require('./create-topic');
const broker = process.env.BROKER;

(async () => {
  const kafka = new Kafka({
    clientId:"tdef",
    brokers: [broker]
  })
  const admin = kafka.admin()
  await admin.connect()
  await createTopics(admin, 'records', 2)
  const producer = kafka.producer()
  await producer.connect()
  let n = 0
  setInterval(() => {
    producer.send({
      topic: "records",
      messages: [{
        partition: (n+=1) % 2,
        value: Buffer.from(`Hello from producer ${new Date().toISOString()}`)
      }]
    })
  }, 1000)
})()
