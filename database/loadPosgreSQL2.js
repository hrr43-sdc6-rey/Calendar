const fs = require('fs');
const { Client } = require('pg');
const fastcsv = require('fast-csv');

const stream = fs.createReadStream('out.csv');
const csvData = [];
const csvStream = fastcsv
  .parse({ quote: '\'', delimiter: '|' })
  .on('data', (data) => {
    csvData.push(data);
  })
  .on('end', () => {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const client = new Client({
      user: 'student',
      password: 'student',
      database: 'tom',
    });

    const query = 'INSERT INTO public.experiences_calendar(exp_id, dates) VALUES ($1, $2)';

    client.connect((err, done) => {
      if (err) throw err;

      try {
        csvData.forEach((row) => {
          client.query(query, [row[0], row[1]], (err2, res) => {
            if (err2) {
              console.log(err2.stack);
            } else {
              console.log('inserted ' + res.rowCount + ' row:', row[0]);
            }
          });
        });
      } finally {
        // done();
      }
    });
  });

stream.pipe(csvStream);
