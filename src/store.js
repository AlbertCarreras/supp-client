import reducer from './Reducers/rootReducer';
import {applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let middleWare = [ thunk ]
let storeArgs = [ reducer, applyMiddleware(...middleWare) ]

if (process.env.NODE_ENV === 'development') {
  middleWare.push(logger)
  storeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}
  
const store = createStore(...storeArgs)

export default store;
