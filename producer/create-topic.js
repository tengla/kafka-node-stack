
const run = async (admin, topic, numPartitions) => {
  try {
    console.log('Arguments', topic, numPartitions);
    const topics = await admin.listTopics()
    if(topics.includes(topic)) {
      console.log('Already have topic', topic);
      return;
    }
    console.log('Create topic', topic, numPartitions);
    await admin.createTopics({
      topics: [{
        topic,
        numPartitions
      }]
    })
    console.log('Create topic success');
  }
  catch (err) {
    console.log(err)
  }
};

module.exports = run;
