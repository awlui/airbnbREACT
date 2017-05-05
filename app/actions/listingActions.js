import {default as airbnbAsync} from '../sources/airbnbAsync';
import {default as constants} from '../actions/constants';

export default {
	getListingById(id) {
		return (dispatch) => {
			airbnbAsync.getListingById(id).then(res => {
				dispatch({type: constants.FETCH_SUCCESS, data: res.data});
			}).catch(err => dispatch({type: constants.FETCH_FAILURE}));
			dispatch({type: constants.FETCHING_LISTING});
		}
	}
}