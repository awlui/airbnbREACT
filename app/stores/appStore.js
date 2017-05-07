import {createStore, applyMiddleware} from 'redux';
import constants from '../actions/constants';
import logger from 'redux-logger';

const initialState = {
	currentPage: 'homepage'
};

const middleware = applyMiddleware(logger);

const reducer = function(state=initialState, action) {
	switch (action.type) {
		case constants.CHANGE_PAGE:
			return {
				...state, currentPage: action.page
			}
		default:
			return state;
	}
}

export default createStore(reducer, middleware);
