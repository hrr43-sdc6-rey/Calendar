const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// const schema = require('./schema.js');

const dateSchema = new mongoose.Schema({
  exp_id: {
    type: Number,
    unique: true,
  },
  dates: [],
});
const Calendar = mongoose.model('Experience', dateSchema);

const get = (id, cb1, cb2) => {
  Calendar.find({ exp_id: id }).exec((err, data) => {
    if (err) {
      return cb1();
    }
    return cb2(data);
  });
};

const create = (record, cb) => {
  Calendar.create(record, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return cb(data);
  });
};

const deleteID = (id, cb) => {
  Calendar.deleteOne({ exp_id: id }, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return cb(data);
  });
};

const update = (id, record, cb) => {
  Calendar.updateOne({ exp_id: id }, record, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return cb(data);
  });
};

// const update = (id, year, month, day, timeslot, cb1, cb2) => {
//   Calendar.find({ exp_id: id }).exec((err, data) => {
//     if (err) {
//       return cb1();
//     }
//     Calendar.updateOne({ exp_id: id }, { dates: data[0].dates }, (err2, dat) => {
//       if (err2) {
//         return cb1();
//       }
//       console.log(dat);
//       return cb2();
//     });
//     return null;
//   });
// };

// update(2, 2020,1,1,'morning');


module.exports.get = get;
module.exports.update = update;
module.exports.create = create;
module.exports.deleteID = deleteID;
