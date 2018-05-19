import { createStore, applyMiddleware } from 'redux';
import reducer 							from '../reducers';
import promiseMiddleware 				from 'redux-promise-middleware'

const 	middleware 	= applyMiddleware( promiseMiddleware() ),
		store 	 	= createStore( reducer, middleware );

export default store;