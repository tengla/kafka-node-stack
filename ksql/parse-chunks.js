
module.exports.ParseChunks = () => {

  const data = []
  let header;
  return (chunk) => {

    data.push(chunk);

    if (data.length < 2) {
      header = JSON.parse(data[0]);
      return {
        header, body: []
      }
    }

    return {
      header,
      body: data.slice(1)
        .map(row => {
          return JSON.parse(row)
        })
        .map(row => {
          return row.map((cell, idx) => {
            return {
              [header.columnNames[idx]]: cell
            }
          }).reduce((a, c) => {
            return {
              ...a,
              ...c
            }
          }, {})
        }).flat()
    }
  }
};