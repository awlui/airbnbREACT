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
	currentPage: 1
}

const middleware = applyMiddleware(thunk, logger);

const reducer = function(state=initialState, action) {
	switch(action.type) {
		case constants.FETCHING_LISTING:
			return {
				...state, isFetching: true, error: false, data: null, reviewError: false, isFetchingReviews: false, reviewData: null, currentPage: 1
			};
		case constants.FETCH_SUCCESS:
			return {
				...state, isFetching: false, data: action.data.listing, id: action.data.listing.id, error: false
			};
		case constants.FETCH_FAILURE:
			return {
				...state, error: true, isFetching: false
			}
		case constants.FETCH_REVIEWS_SUCCESS:
			return {
				...state, reviewError: false, isFetchingReviews: false, reviewData: action.data
			}
		case constants.FETCH_REVIEWS_FAILURE:
			return {
				...state, reviewData: null, reviewError: false, isFetchingReviews: false
			}
		case constants.FETCHING_REVIEWS:
			return {
				...state, isFetchingReviews: true, reviewData: null
			}
		case constants.CHANGE_PAGE:
			return {
				...state, currentPage: action.page
			}
		default:
			return state;

	}
};

export default createStore(reducer, middleware);