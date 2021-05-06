
const avro = require('avro-js');

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

module.exports = (producer, topic) => {
  let n = 0
  setInterval(() => {
    const train = {
      kind: 'TRAIN',
      trainId: Math.floor(Math.random() * 1000* Date.now()).toString(36),
      message: `Hello from train producer ${new Date().toISOString()}`
    };
    const buf = type.toBuffer(train);
    const message = {
      partition: (n+=1) % 2,
      value: buf
    };
    producer.send({
      topic: topic,
      messages: [message]
    })
  }, 2500)
};
