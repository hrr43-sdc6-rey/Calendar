const process = require('process');
const db = require('../database');

db.create({
  exp_id: 101,
  dates: [],
}, (data) => {
  console.log(data);
  return process.exit(0);
});
