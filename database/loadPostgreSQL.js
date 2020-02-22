const csv = require('csv-parser');
const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
  user: 'student',
  password: 'student',
  database: 'tom',
});

client.connect();

async function main() {
  try {
    const { rows } = await client.query('SELECT * FROM experiences_calendar');
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
}

async function writeRecord(data) {
  try {
    await client.query('INSERT INTO public.experiences_calendar(exp_id, dates) VALUES ($1, $2)', [data.exp_id, data.dates]);
  } catch (err) {
    console.log(err);
  }
}

fs.createReadStream('out.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row.exp_id);
    writeRecord(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

main()
  .then(() => {
    // client.end();
  });
