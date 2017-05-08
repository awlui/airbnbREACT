import React from 'react';
import _ from 'lodash';
export default ({listingsCount, currentPage, changePage, listingsPerPage, elId=""}) => {
	let numberOfPages;
	let arr = []
	if (listingsCount/listingsPerPage >= 17) {
		numberOfPages = 17;
	} else if (listingsCount/listingsPerPage > 1) {
		numberOfPages = Math.ceil(listingsCount/listingsPerPage)
	} else {
		numberOfPages = 1;
	}

	if (numberOfPages < 6) {
		arr = _.range(1, numberOfPages+1);
	} else if (currentPage < 3 || (numberOfPages - currentPage) < 2) {
		if (currentPage < 3) {
			arr = _.range(1,6);
			arr[3] = "...";
			arr[4] = numberOfPages
		} else {
			arr = _.range(numberOfPages-4,numberOfPages + 1);
			arr[1] = "..."
			arr[0] = 1;
		}
	} else if (currentPage === 3 || ((numberOfPages - currentPage) === 2)) {
		if (currentPage === 3) {
			arr = _.range(1,7);
			arr[4] = "...";
			arr[5] = numberOfPages;
		} else {
			arr =_.range(numberOfPages-5, numberOfPages + 1);
			arr[1] = "...";
			arr[0] = 1;
		}
	} else if (currentPage === 4 || ((numberOfPages - currentPage) === 3)) {
		if (currentPage === 4) {
			arr = _.range(1,8);
			arr[5] = "...";
			arr[6] = numberOfPages;
		} else {
			arr = _.range(numberOfPages-6, numberOfPages+1);
			arr[1] = "...";
			arr[0] = 1;
		}
	} else if (currentPage >= 5 || ((numberOfPages - currentPage) >= 4)) {
		arr = _.range(1,8);
		arr[1] = "...";
		arr[5] = "...";
		arr[2] = currentPage - 1;
		arr[3] = currentPage;
		arr[4] = currentPage + 1;
		arr[0] = 1;
		arr[6] = numberOfPages;
	}
	return (
		<ul className="paginationBar">
			{arr.map((value) => (<li className={(parseInt(value) === currentPage) ? "currentPage" : ""}>{(value === "...") ? value : <a href={`#${elId}`} onClick={() => changePage(parseInt(value, 10))}>{value}</a>}</li>))}
		</ul>
		)
}