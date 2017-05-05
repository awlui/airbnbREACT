import axios from 'axios';
export default {
	getBySearch(location, offset, limit) {
		let url = "/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&_format=for_search_results_with_minimal_pricing";
		if (location) {
			url += `&location=${location}`;
		}
		if (offset) {
			url += `&_offset=${offset}`;
		}
		if (limit) {
			url += `&_limit=${limit}`;
		}
		return axios.get(url);
	},
	getByBounds(location, offset, limit) {
		let url="/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&_format=for_search_results_with_minimal_pricing";
		if (location) {
			url += `&ne_lat=${location.neLat}`;
			url += `&ne_lng=${location.neLng}`;
			url += `&sw_lat=${location.swLat}`;
			url += `&sw_lng=${location.swLng}`;
		}
		if (offset) {
			url += `&_offset=${offset}`;
		}
		if (limit) {
			url += `&_limit=${limit}`;
		}
		return axios.get(url);
	},
	getListingById(id) {
		let url="/v2/listings/${id}?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3";
		return axios.get(url);
	} 
}