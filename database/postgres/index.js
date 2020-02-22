const { Client } = require('pg');

const client = new Client({
  user: 'student',
  password: 'student',
  database: 'tom',
});

client.connect();

const get = (id, cb1, cb2) => {
  client.query('SELECT * FROM experiences_calendar WHERE exp_id = ($1)', [id], (err, res) => {
    if (err) {
      return cb1();
    }
    return cb2(res.rows[0]);
  });
};

module.exports.get = get;
