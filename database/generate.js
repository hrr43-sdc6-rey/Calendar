
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    { id: 'exp_id', title: 'exp_id' },
    { id: 'dates', title: 'dates' },
  ],
});

function batchWrite(data, cb) {
  csvWriter
    .writeRecords(data)
    .then(() => {
      // console.log(`${data.length} records created`);
      cb();
    });
}

function getData(batchIndex, batchSize) {
  const data = [];
  for (let i = batchIndex * batchSize + 1; i <= batchIndex * batchSize + batchSize; i += 1) {
    data.push({
      exp_id: i,
      dates: '[{},{},{}]',
    });
  }
  return data;
}

function runBatches() {
  const batchAmt = 100;
  const batchSize = 100;
  let batchIndex = 0;
  function oneBatch() {
    batchWrite(getData(batchIndex, batchSize), () => {
      batchIndex += 1;
      console.log(`batchIndex: ${batchIndex}  batchSize: ${batchSize}  batchTotal: ${batchIndex * batchSize}`);
      // check to see if more batches need to be run
      if (batchIndex < batchAmt) {
        oneBatch();
      }
    });
  }
  oneBatch();
}

runBatches();
