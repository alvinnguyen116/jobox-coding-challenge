import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import finalReducer from './reducers/index';
import thunk from "redux-thunk";

// todo: remove logger in production env
const middleware = applyMiddleware(logger, thunk);

export default createStore(finalReducer, middleware);