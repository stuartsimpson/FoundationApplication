import {applyMiddleware, combineReducers, createStore} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import coreReducers from './reducers/coreReducers';

var coreReducersList = coreReducers();

const reducers = combineReducers(coreReducersList);

const middleware = applyMiddleware(promise(), thunk, createLogger());

export default createStore(reducers, middleware);
