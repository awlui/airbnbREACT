import axios from 'axios';
export default {
	getBySearch(location, offset) {
		let url = "/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty"
		if (location) {
			url += `&location=${location}`
		}
		if (offset) {
			url += `&_offset=${offset}`
		}
		return axios.get(url);
	} 
}