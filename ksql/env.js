
const config = () => {
  if (!process.env.KSQLDB) {
    console.log('Variable KSQLDB is not present.')
    return {}
  }
  return {
    host: process.env.KSQLDB.split(":").slice(0,1)[0],
    port: process.env.KSQLDB.split(":").slice(1)[0]
  }
};

module.exports = { config }
