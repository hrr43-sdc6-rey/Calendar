import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day.jsx';

// each td hs fixed width and length
const Row = ({ days }) => (
  <tr>
    {days.map((day, i) => (
      <td key={i}>
        <Day day={day.d} morning={day.m} lunch={day.l} />
      </td>
    ))}
  </tr>
);

Day.propTypes = {
  days: PropTypes.array,
};

export default Row;
