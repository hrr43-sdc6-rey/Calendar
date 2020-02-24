import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const expId = parseInt(window.location.href.split('/').slice(-1)[0], 10) || 1;
console.log('expId in URL: ', expId);

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const id = urlParams.get('id') - 0;

// console.log(`id = ${id}`);

ReactDOM.render(<App expId={expId || 1} />, document.getElementById('calendar'));
