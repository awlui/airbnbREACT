import {default as airbnbAsync} from '../sources/airbnbAsync';
import {default as constants} from '../actions/constants';
let mapActions;
export default {
	getBySearch(location, offset, limit, bounds={}) {
		return (dispatch) => {
		  airbnbAsync.getBySearch(location, offset, limit).then(res => {
		  	dispatch({type: constants.FETCH_SUCCESS, data: res.data, location, bounds});
		  });
		  dispatch({type: constants.FETCHING_LOCATIONS});
		}
	},
	getByBounds(location, offset, limit) {
		return (dispatch) => {
			let bounds = {
				"neLat": location.getNorthEast().lat(),
				"neLng": location.getNorthEast().lng(),
				"swLat": location.getSouthWest().lat(),
				"swLng": location.getSouthWest().lng()
			}
			airbnbAsync.getByBounds(bounds, offset, limit).then(res => {
				dispatch({type: constants.FETCH_SUCCESS, data: res.data});
			});
			dispatch({type: constants.FETCHING_LOCATIONS});
		}
	}
}