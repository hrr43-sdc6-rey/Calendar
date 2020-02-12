const process = require('process');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dateSchema = new mongoose.Schema({
  exp_id: Number,
  dates: [],
});

const dateInCalendar = mongoose.model('Experience', dateSchema);

// Created seed for the next 6 months
const seed = () => {
  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  // month generator - several amount of months from now
  const howManyMonthToGenerate = 6;
  const data = [];
  let neededYear = 0;
  let nextMonth = 0;
  // comes with year, month, neededYear, nextMonth;
  for (let x = 0; x < howManyMonthToGenerate; x += 1) {
    if (month === 11) {
      neededYear += 1;
      nextMonth = 0;
    } else {
      neededYear = year;
      nextMonth = month + 1;
    }
    const daysInMonth = new Date(neededYear, nextMonth, 0).getDate();

    // empty calendar 6*7
    const cdr = [];
    for (let i = 0; i < 6; i += 1) {
      cdr[i] = [];
      for (let j = 0; j < 7; j += 1) {
        cdr[i][j] = {};
      }
    }

    const weekdayOfFirstDayInMonth = new Date(year, month, 1).getDay();
    let line = 0;
    let place = weekdayOfFirstDayInMonth;
    for (let i = 1; i <= daysInMonth; i += 1) {
      cdr[line][place].day = i.toString();
      cdr[line][place].morning = Math.random() > 0.3;
      cdr[line][place].lunch = Math.random() > 0.3;
      place += 1;
      if (place === 7) {
        line += 1;
        place = 0;
      }
    }

    data.push({
      year,
      month,
      days: cdr,
    });

    // data.push(cdr)

    if (month === 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }
  }
  return data;
};

const date1 = new Date();


const createRecords = () => {
  for (let j = 0; j < 1; j += 1) {
    const batch = [];
    for (let i = 1; i <= 100; i += 1) {
      batch.push({
        exp_id: j * 100 + i,
        dates: seed(),
      });
    }

    dateInCalendar.insertMany(batch, (err2) => {
      if (err2) {
        return console.log(err2);
      }
      if (j === 0) {
        console.log('Complete');
        console.log((new Date() - date1) / 1000);
        return process.exit(0);
      }
      return null;
    });
  }
};

dateInCalendar.deleteMany({}, (err1) => {
  if (err1) {
    return console.log(err1);
  }
  createRecords();
  return null;
});

// let counter = 0;
// for (let i = 1; i <= 100; i += 1) {
//   const calendar = new dateInCalendar({
//     exp_id: i,
//     dates: seed(),
//   });
//   calendar.save((err) => {
//     if (err) {
//       console.log(err);
//     }
//     counter += 1;
//     console.log(counter);
//     if (counter >= 100) {
//       return process.exit(0);
//     }
//   });

// mongoose.connection.close();

// process.exit(0);
