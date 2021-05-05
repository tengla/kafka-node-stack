

const http2 = require('./http2')
const config = require('./env').config()

const request = http2.QueryStreamRequest(
  'http://' + config.host + ":" + config.port, '/inserts-stream')

request.stream.on('data', chunk => console.log(chunk.toString()));
request.stream.on('response', headers => {
  if (!headers[http2.constants.HTTP2_HEADER_STATUS] === 200) {
    console.log('Status OK')
  } else {
    console.log('Something went wrong', headers);
    client.close()
  }
});

request.stream.on('end', () => {
  client.close()
})

const $write = data => {
  const buf = Buffer.from(JSON.stringify(data))
  request.stream.write(buf)
  request.stream.write(Buffer.from('\r\n'))
};

const $randid = () => Math.floor(Math.random() * 1000 * Date.now()).toString(36)

const $randlon = () => {
  return Math.random() * 180
}

const $randlat = () => {
  return Math.random() * 90
}

$write({
  target: 'trains'
})

let n = 0;

const intId = setInterval(() => {

  if(n > 10) {
    stream.end()
    console.log('stream.end()')
    clearInterval(intId)
    return
  }

  $write({
    profileId: $randid(),
    longitude: $randlon(),
    latitude: $randlat()
  })
  n += 1;
}, 1000)
