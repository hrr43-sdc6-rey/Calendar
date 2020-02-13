const process = require('process');
const db = require('../database');

db.update(101, { dates: ['testing'] }, (data) => {
  console.log(data);
  return process.exit(0);
});
