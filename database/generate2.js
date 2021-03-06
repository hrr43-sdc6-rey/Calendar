const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');

const myFile = 'out.csv';

const recordNum = 3;

const writeFile = fs.createWriteStream(myFile);

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'exp_id', title: 'exp_id' },
    { id: 'dates', title: 'dates' },
  ],
});

// Created seed for the next 6 months
const seed = () => {
  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  // month generator - several amount of months from now
  const howManyMonthToGenerate = 6;
  const data = [];
  let neededYear = 0;
  let nextMonth = 0;
  // comes with year, month, neededYear, nextMonth;
  for (let x = 0; x < howManyMonthToGenerate; x += 1) {
    if (month === 11) {
      neededYear += 1;
      nextMonth = 0;
    } else {
      neededYear = year;
      nextMonth = month + 1;
    }
    const daysInMonth = new Date(neededYear, nextMonth, 0).getDate();

    // empty calendar 6*7
    const cdr = [];
    for (let i = 0; i < 6; i += 1) {
      cdr[i] = [];
      for (let j = 0; j < 7; j += 1) {
        cdr[i][j] = {};
      }
    }

    const weekdayOfFirstDayInMonth = new Date(year, month, 1).getDay();
    let line = 0;
    let place = weekdayOfFirstDayInMonth;
    for (let i = 1; i <= daysInMonth; i += 1) {
      cdr[line][place].d = i.toString();
      cdr[line][place].m = Math.random() > 0.3;
      cdr[line][place].l = Math.random() > 0.3;
      place += 1;
      if (place === 7) {
        line += 1;
        place = 0;
      }
    }
    data.push({
      year,
      month,
      day: cdr,
    });

    // data.push(cdr)

    if (month === 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }
  }
  return data;
};

const writeRecords = (numRecords, writer, encoding, callback) => {
  writeFile.write(csvStringifier.getHeaderString(), 'utf8');

  let id = 0;
  let i = numRecords;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const data = id + '|\"' + JSON.stringify(seed()) + '\"';

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // stop early
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
};

writeRecords(recordNum, writeFile, 'utf-8', () => {
  writeFile.end();
});


// function getData(batchIndex, batchSize) {
//   const data = [];
//   for (let i = batchIndex * batchSize + 1; i <= batchIndex * batchSize + batchSize; i += 1) {
//     // Push and define all my data below
//     data.push({
//       exp_id: i,
//       dates: JSON.stringify(seed()),
//     });
//     console.log(JSON.stringify(seed()));
//     // Push and define all my data above
//   }
//   return data;
// }

// function runBatches() {
//   // set these two variables to control the overall data size
//   const batchAmt = 1; // number of batches to run
//   const batchSize = 1; // number of records per batch

//   let batchIndex = 0;
//   function oneBatch() {
//     batchWrite(getData(batchIndex, batchSize), () => {
//       batchIndex += 1;
//       console.log(`batchIndex: ${batchIndex}  batchSize: ${batchSize}  batchTotal: ${batchIndex * batchSize}  timer: ${((new Date()) - startTimer)/1000} secs`);
//       // check to see if more batches need to be run
//       if (batchIndex < batchAmt) {
//         oneBatch();
//       }
//     });
//   }
//   oneBatch();
// }

// const startTimer = new Date();

// runBatches(); //  let's do this thing
