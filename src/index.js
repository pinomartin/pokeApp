import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
//para que los componentes puedan leer la tienda es necesarios "envolverlos" en un provider

import generateStore from './redux/store'

const store = generateStore(); //funcion que devuelve el Store


ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
    <App />
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

