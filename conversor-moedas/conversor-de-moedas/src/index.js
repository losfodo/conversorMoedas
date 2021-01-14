import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConversorMoedas from './conversor-moedas';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';//importando bootstrap alem de install pelo terminal

ReactDOM.render(<ConversorMoedas />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();