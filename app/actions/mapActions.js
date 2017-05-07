import {default as airbnbAsync} from '../sources/airbnbAsync';
import {default as constants} from '../actions/constants';
import mapStore from '../stores/mapStore';
export default {
	getBySearch(location, offset, limit, bounds, startDate=mapStore.getState().startDate, endDate=mapStore.getState().endDate) {
		return (dispatch) => {
		  airbnbAsync.getBySearch(location, offset, limit, startDate, endDate).then(res => {
		  	dispatch({type: constants.FETCH_SUCCESS, data: res.data, location, bounds});
		  });
		  dispatch({type: constants.FETCHING_LOCATIONS, startDate: startDate, endDate: endDate});
		}
	},
	getByBounds(location, offset, limit, startDate=mapStore.getState().startDate, endDate=mapStore.getState().endDate) {
		return (dispatch) => {
			let bounds = {
				"neLat": location.getNorthEast().lat(),
				"neLng": location.getNorthEast().lng(),
				"swLat": location.getSouthWest().lat(),
				"swLng": location.getSouthWest().lng()
			}
			airbnbAsync.getByBounds(bounds, offset, limit, startDate, endDate).then(res => {
				dispatch({type: constants.FETCH_SUCCESS, data: res.data, bounds: location});
			});
			dispatch({type: constants.FETCHING_LOCATIONS, startDate, endDate});
		}
	}
}