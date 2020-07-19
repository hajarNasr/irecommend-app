import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer/authReducer';
import './css/index.css';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
));

ReactDOM.render( 
    <Router> 
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>
     , 
   document.getElementById('root')
);

