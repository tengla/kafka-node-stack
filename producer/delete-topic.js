module.exports = async (admin, topic) => {
  const topics = await admin.listTopics()
  if (topics.includes(topic)) {
    await admin.deleteTopics({
      topics: [topic],
      timeout: 300,
    })
    console.log('Deleted topic', topic);
  } else {
    console.log('Topic not found:', topic);
  }
};