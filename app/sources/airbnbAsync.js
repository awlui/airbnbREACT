import axios from 'axios';
export default {
	getBySearch(location, offset) {
		let url = "/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty";
		if (location) {
			url += `&location=${location}`;
		}
		if (offset) {
			url += `&_offset=${offset}`;
		}
		return axios.get(url);
	},
	getByBounds(location, offset) {
		let url="/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty";
		if (location) {
			location.neLat += `&ne_lat=${location.neLat}`;
			location.neLng += `&ne_lng=${location.neLng}`;
			location.swLat += `&sw_lat=${location.swLat}`;
			location.swLng += `&sw_lng=${location.swLng}`;
		}
		if (offset) {
			url += `&_offset=${offset}`;
		}
	} 
}