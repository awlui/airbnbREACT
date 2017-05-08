import axios from 'axios';
export default {
	getBySearch(location, offset, limit, startDate, endDate) {
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
		if (startDate) {
			url += `&checkin=${startDate}`;
		}
		if (endDate) {
			url += `&checkout=${endDate}`;
		}
		return axios.get(url);
	},
	getByBounds(location, offset, limit, startDate, endDate) {
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
		if (startDate) {
			url += `&checkin=${startDate.format('YYYY','MM','DD')}`;
		}
		if (endDate) {
			url += `&checkout=${endDate.format('YYYY','MM','DD')}`;
		}
		return axios.get(url);
	},
	getListingById(id) {
		let url=`/v2/listings/${id}?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3`;
		return axios.get(url);
	},
	getReviewsById(id, offset=0, limit=10) {
		let url = `/v2/reviews?client_id=3092nxybyb0otqw18e8nh5nty&_format=for_mobile_client&role=all&listing_id=${id}`;
		if (offset) {
			url += `&_offset=${offset}`;
		}
		if (limit) {
			url += `&_limit=${limit}`;
		}
		return axios.get(url);
	}
}