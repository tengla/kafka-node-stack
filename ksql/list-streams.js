
const { HttpPost } = require('./http');
const config = require('./env').config()

const ListStreams = () => {
  const ksql = `LIST STREAMS;`
  const { signal } = HttpPost(config.host, config.port, "/ksql", ksql, {})
  signal.on("end", data => console.log(data.toString()));
};

ListStreams()