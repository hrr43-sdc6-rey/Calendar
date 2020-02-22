const { Client } = require('pg');

const client = new Client({
  user: 'student',
  password: 'student',
  database: 'tom',
});

client.connect();

// async function main(id) {
//   try {
//     const { rows } = await client.query('SELECT * FROM experiences_calendar WHERE exp_id = ($1)', [id]);
//     console.log(rows);
//   } catch (error) {
//     console.log(error);
//   }
// }

// main()
//   .then(() => {
//     client.end();
//   });


// main(9999000)
//   .then(() =>{
//     console.log('Done');
//   });



async function read(id, cb) {
  try {
    const { rows } = await client.query('SELECT * FROM experiences_calendar WHERE exp_id = ($1)', [id]);
    cb();
  } catch (error) {
    console.log(error);
  }
}


function readem(n) {
  const array = [];
  for (let i = 1; i <= n; i += 1) {
    array.push(Math.floor(Math.random() * (998888)) + 10);  // all over database
    // array.push(Math.floor(Math.random() * (999999)) + 9000000); // last 10% of database
    // array.push(Math.floor(Math.random() * (999999)) + 1); // first 10% of database
    // 9990000
  }

  const start = new Date();

  for (let i = 1; i <= n; i += 1) {
    read(array[i], () => {
      if (i === n) {
        console.log('reading ' + n + ' records in ' + (new Date() - start) / 1000);
        client.end();
      }
    });
  }
}

readem(1000);

