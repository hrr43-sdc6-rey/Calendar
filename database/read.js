const process = require('process');
const db = require('../database');

db.get(101,
  () => {},
  (data) => {
    console.log(data);
    return process.exit(0);
});
