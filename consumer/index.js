const { Kafka } = require('kafkajs');
const avro = require('avro-js');
const util = require('util');

const type = avro.parse({
  name: 'Train',
  type: 'record',
  fields: [
    {
      name: 'kind', type: {
        name: 'Kind', type: 'enum', symbols: ['TRAIN', 'BUS']
      }
    },
    {
      name: 'trainId', type: 'string'
    },
    {
      name: 'message', type: 'string'
    }
  ]
});

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
      console.log(err.message)
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
      try {
        const obj = type.fromBuffer(
          result.message.value
        );
        console.log(
          `topic: ${result.topic}, partition: ${result.partition},
          message: ${util.inspect(obj, { colors: true, depth: 5 })}`);
      } catch (err) {
        console.log(err);
      }
    }
  });
}

wait(run);
