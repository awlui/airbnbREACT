import {default as airbnbAsync} from '../sources/airbnbAsync';
import {default as constants} from '../actions/constants';

export default {
	getListingById(id) {
		return (dispatch) => {
			airbnbAsync.getListingById(id).then(res => {
				dispatch({type: constants.FETCH_SUCCESS, data: res.data});
			});
			dispatch({type: constants.FETCH})
		}
	}
}