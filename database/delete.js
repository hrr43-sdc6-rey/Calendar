const process = require('process');
const db = require('../database');

db.deleteID(101, (data) => {
  console.log(data);
  return process.exit(0);
});
