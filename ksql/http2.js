
const http2 = require('http2');

const QueryStreamRequest = (host, path) => {
  const client = http2.connect(host);
  const headers = {};
  headers[http2.constants.HTTP2_HEADER_METHOD] = http2.constants.HTTP2_METHOD_POST
  headers[http2.constants.HTTP2_HEADER_PATH] = path
  headers['Content-Type'] = 'application/vnd.ksql.v1+json'
  const stream = client.request(headers)
  stream.setEncoding('utf8')
  return {
    client,
    stream,
    write: (buffer) => {
      stream.write(buffer)
      stream.write(Buffer.from('\r\n'))
    },
    end: () => stream.end()
  }
};

const QueryStreamPost = (client, stream, buffer, defaultHeaders = {}) => {
  const headers = {};
  headers[http2.constants.HTTP2_HEADER_METHOD] = http2.constants.HTTP2_METHOD_POST
  headers[http2.constants.HTTP2_HEADER_PATH] = path
  headers['Content-Length'] = buffer.length
  headers['Content-Type'] = 'application/vnd.ksql.v1+json'
  stream = client.request({
    ...headers,
    ...defaultHeaders
  })
  stream.write(buffer)
};

module.exports = { QueryStreamRequest, QueryStreamPost }