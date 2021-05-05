
const queryStream = require('./query-stream');
const config = require('./env').config();

const { signal, client } = queryStream(
  `http://${config.host}:${config.port}`,
  {
    sql: 'SELECT * FROM trains EMIT CHANGES;'
  });

client.on('error', (err) => console.error(err));

signal.on('response', res => {

  console.log('response', res);
});

signal.on('data', data => {
  console.log('data', data);
});
