import {createStore, applyMiddleware} from 'redux';
import {default as constants} from '../actions/constants';
import {default as airbnbAsync} from '../sources/airbnbAsync';
import logger from 'redux-logger';
import {default as mapActions} from '../actions/mapActions';
import thunk from 'redux-thunk';
let mapStore;

let initialState = {
	listings: [],
	markers: [],
	bounds: {},
	value: "",
	isFetching: false
}
const middleware = applyMiddleware(thunk, logger);
const reducer = function(state=initialState, action) {
	switch (action.type) {
		case constants.FETCHING_LOCATIONS:
		  return {
		  	...state, isFetching: true
		  }
		case constants.FETCH_SUCCESS:
		  let listings = [];
		  action.data.search_results.forEach((listing) =>{
		  	listings.push(listing);
		  })
		  console.log('Done Fetching');
		  console.log('lat', action.data.search_results[0].listing.lat);
		  console.log('lat', action.data.search_results[0].listing.lng);
		  return {
		  	...state, listings: listings, isFetching: false
		  };
		case constants.FETCH_FAILURE:
		default:
		  return state;
	}
}


export default createStore(reducer, middleware);

// store.dispatch(mapActions.getBySearch('Los Angeles', 0));