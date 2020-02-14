const process = require('process');
const db = require('../database');

db.create({
  dates: [],
}, (data) => {
  console.log(data);
  return process.exit(0);
});
