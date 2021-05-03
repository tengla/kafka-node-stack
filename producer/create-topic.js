
const run = async (admin, topic, numPartitions) => {
  try {
    const topics = await admin.listTopics()

    if(topics.includes(topic)) {
      console.log('already have topic', topics);
       return;
    }
    await admin.createTopics({
      topics: [{
        topic,
        numPartitions
      }]
    })
  }
  catch (err) {
    console.log(err)
  }
};

module.exports = run;
