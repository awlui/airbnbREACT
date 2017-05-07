import {createStore, applyMiddleware} from 'redux';
import constants from '../actions/constants';
import {default as airbnbAsync} from '../sources/airbnbAsync';
import logger from 'redux-logger';
import {default as mapActions} from '../actions/mapActions';
import thunk from 'redux-thunk';

const initialState = {
	data: null,
	id: null,
	reviewData: null,
	isFetching: false,
	error: false,
	reviewError: false,
	isFetchingReviews: false,
}

const middleware = applyMiddleware(thunk, logger);

const reducer = function(state=initialState, action) {
	switch(action.type) {
		case constants.FETCHING_LISTING:
			return {
				...state, isFetching: true, error: false, data: null
			};
		case constants.FETCH_SUCCESS:
			return {
				...state, isFetching: false, data: action.data.listing, id: action.data.listing.id, error: false
			};
		case constants.FETCH_FAILURE:
			return {
				...state, error: true, isFetching: false
			}
		case constants.FETCH_REVIEWS:
			return {
				...state, isFetchingReviews
			}
		default:
			return state;

	}
};

export default createStore(reducer, middleware);