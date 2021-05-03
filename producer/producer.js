
module.exports = (producer) => {
  let n = 0
  setInterval(() => {
    const message = {
      partition: (n+=1) % 2,
      value: `Hello from producer ${new Date().toISOString()}`
    };
    console.log('sending', message);
    producer.send({
      topic: "records",
      messages: [message]
    })
  }, 2500)
};
