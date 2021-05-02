
const run = async (admin, topic, numPartitions) => {
  try {
    const topics = await admin.listTopics()
    console.log('topics', topics);
    if(topics.includes(topic)) {
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
