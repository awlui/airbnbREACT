import {createStore, applyMiddleware} from 'redux';
import {default as constants} from '../actions/constants';
import {default as airbnbAsync} from '../sources/airbnbAsync';
import logger from 'redux-logger';
import {default as mapActions} from '../actions/mapActions';
import thunk from 'redux-thunk';
import moment from 'moment';
const initialState = {
	listings: [],
    markers: [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001
      },
      key: 'Taiwan',
      defaultAnimation: 2
    }],
	bounds: new google.maps.LatLngBounds({lat: 33.7036917, lng: -118.6681759}, {lat: 34.3373061, lng: -118.1552891}),
	value: "",
	isFetching: false,
	highlightNumber: null,
	currentInfoBox: null,
	appSize: null,
	location: "Los Angeles",
	mapCenter: {
		lat: 34.0522342,
		lng: -118.2436849
	},
	noResults: false,
	currentPage: 1,
	listingCount: 0,
	startDate: NaN,
	endDate: NaN,
	currentRoute: "homepage"



}
const middleware = applyMiddleware(thunk, logger);
const reducer = function(state=initialState, action) {
	switch (action.type) {
		case constants.FETCHING_LOCATIONS:
		  return {
		  	...state, isFetching: true, startDate: action.startDate, endDate: action.endDate
		  }
		case constants.FETCH_SUCCESS:
		  let listings = [];
		  let noResults = false;
		  action.data.search_results.forEach((listing) => {
		  	let unwrappedListing = listing.listing;
		  	let processedListing = {
		  		position: new google.maps.LatLng(unwrappedListing.lat, unwrappedListing.lng),
		  		city: unwrappedListing.city,
		  		bedrooms: unwrappedListing.bedrooms,
		  		bathrooms: unwrappedListing.bathrooms,
		  		beds: unwrappedListing.beds,
		  		name: unwrappedListing.name,
		  		neighborhood: unwrappedListing.neighborhood,
		  		person_capacity: unwrappedListing.person_capacity,
		  		picture_url: unwrappedListing.picture_url,
		  		star_rating: unwrappedListing.star_rating,
		  		id: unwrappedListing.id


		  	};
		  	listings.push({listing: processedListing, pricing: listing.pricing_quote});
		  })
		  if (listings.length === 0) {
		  	noResults = true;
		  }
		  return {
		  	...state, listings: listings, isFetching: false, highlightNumber: null, currentInfoBox: null, location: action.location, bounds: action.bounds, noResults, listingsCount: action.data.metadata.listings_count
		  };
		case constants.CHANGE_HIGHLIGHT:
			return {
				...state, highlightNumber: action.index
			}
		case constants.CHANGE_INFOBOX:
			return {
				...state, currentInfoBox: action.index
			}
		case constants.CHANGE_SIZE:
			return {
				...state, appSize: action.size
			}
		case constants.CHANGE_CENTER:
			return {
				...state, mapCenter: action.center
			}
		case constants.CHANGE_PAGE:
			return {
				...state, currentPage: action.page
			}
		case constants.CHANGE_ROUTE:
			return {
				...state, currentRoute: action.page
			}
		case constants.FETCH_FAILURE:
		default:
		  return state;
	}
}


export default createStore(reducer, middleware);

// store.dispatch(mapActions.getBySearch('Los Angeles', 0));