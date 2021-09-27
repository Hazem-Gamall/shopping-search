import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Results } from './results';

export const configureStore = () =>{
    
    const store = createStore(Results, applyMiddleware(thunk, logger));

    return store;
}