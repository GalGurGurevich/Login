import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './LoginPage/LoginPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <LoginPage />
    </Provider>,
    document.querySelector('#root'),
);
