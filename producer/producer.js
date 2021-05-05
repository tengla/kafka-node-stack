
module.exports = (producer, topic) => {
  let n = 0
  setInterval(() => {
    const message = {
      partition: (n+=1) % 2,
      value: `Hello from producer ${new Date().toISOString()}`
    };
    console.log('sending', message);
    producer.send({
      topic: topic,
      messages: [message]
    })
  }, 2500)
};
