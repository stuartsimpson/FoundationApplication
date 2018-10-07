/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {applyMiddleware, combineReducers, createStore} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import coreReducers from '../../core/reducers/coreReducers';
import moduleReducer from './reducers/moduleReducer';

var coreReducersList = coreReducers();
coreReducersList.moduleState = moduleReducer;

const reducers = combineReducers(coreReducersList);

const middleware = applyMiddleware(promise(), thunk, createLogger());

export default createStore(reducers, middleware);