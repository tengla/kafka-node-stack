const http = require('http')
const EventEmitter = require('events');

const HttpPost = (host, port, path, query, streamsProperties = {}) => {
  const signal = new EventEmitter();
  const options = {
    host, port, path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.ksql.v1+json'
    }
  };
  const req = http.request(options, res => {
    const chunks = []
    res.on('data', chunk => {
      chunks.push(chunk)
      signal.emit('data', chunk)
    })
    res.on('end', () => {
      const buf = Buffer.concat(chunks)
      signal.emit('end', buf)
    })
  })
  req.write(Buffer.from(JSON.stringify({
    ksql: query,
    streamsProperties
  })))
  req.end()
  return { signal }
}

module.exports = { HttpPost }
