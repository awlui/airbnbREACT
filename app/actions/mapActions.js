import {default as airbnbAsync} from '../sources/airbnbAsync';
import {default as constants} from '../actions/constants';
let mapActions;
export default {
	getBySearch(location, offset, limit) {
		return (dispatch) => {
		  airbnbAsync.getBySearch(location, offset, limit).then(res => {
		  	dispatch({type: constants.FETCH_SUCCESS, data: res.data});
		  });
		  dispatch({type: constants.FETCHING_LOCATIONS});
		}
	},
	getByBounds(location, offset, limit) {
		return (dispatch) => {
			airbnbAsync.getByBounds(location, offset, limit).then(res => {
				dispatch({type: constants.FETCH_SUCCESS, data: res.data});
			});
			dispatch({type: constants.FETCHING_LOCATIONS});
		}
	}
}