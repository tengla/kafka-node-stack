
const { HttpPost } = require('./http');
const config = require('./env').config();

const CreateStream = (ksql, streamsProperties = {}) => {
  const { signal } = HttpPost(config.host, config.port, "/ksql", ksql, streamsProperties)
  signal.on("end", data => console.log(data.toString()));
};

const createSql = `CREATE STREAM trains (
  trainId VARCHAR, latitude DOUBLE, longitude DOUBLE
) WITH (
  kafka_topic='locations', value_format='json', partitions=1
);`

CreateStream(createSql)
