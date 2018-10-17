import {applyMiddleware, combineReducers, createStore} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import coreReducers from 'Core/reducers/coreReducers';
import moduleReducer from './reducers/moduleReducer';

var coreReducersList = coreReducers();
coreReducersList.moduleState = moduleReducer;

const reducers = combineReducers(coreReducersList);

const middleware = applyMiddleware(promise(), thunk, createLogger());

export default createStore(reducers, middleware);
