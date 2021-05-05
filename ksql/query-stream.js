
const EventEmitter = require('events');
const { ParseChunks } = require('./parse-chunks');
const { QueryStreamRequest } = require('./http2');

module.exports = (host, data) => {

  const signal = new EventEmitter();

  const buffer = Buffer.from(JSON.stringify(data))

  const chunks = ParseChunks();

  const { client, stream } = QueryStreamRequest(host,
    '/query-stream')

  stream.on('response', (headers) => {
    if (headers[':status'] >= 400) {
      console.log('Oops! Error', headers)
      client.close()
      return
    }
    signal.emit('response', headers[':status'])
  });

  stream.on('data', chunk => {
    signal.emit('data', chunks(chunk))
  });

  stream.on('close', () => {
    signal.emit('close');
  })
  stream.end(buffer);
  return { signal, client };
};
