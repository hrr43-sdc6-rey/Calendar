const express = require('express');
const db = require('../database');

const port = process.env.PORT || 3005;

const app = express();

app.use(express.static('public'));

app.get('/calendar/:id', (req, res) => {
  db.get(req.params.id,
    () => { res.sendStatus(400); },
    (data) => { res.send(data); });
});

app.listen(port, () => { console.log(`Listening on port ${port}`); });
