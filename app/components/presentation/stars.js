import React from 'react';
import _ from 'lodash';
export default ({rating}) => {
	console.log(rating, 'rating');
	let stars, halfStars;
	rating = rating.toString().split(".");
	console.log(rating, 'rating2');
	if (rating[1] === "5") {
		rating[1] = "1";
	} else {
		rating[1] = "0";	
	}
	return (
		<ul className="stars">
			{_.times(parseInt(rating[0], 10), () => (<li><i className="fa fa-star" aria-hidden="true"></i></li>))}
			{_.times(parseInt(rating[1], 10), () => (<li><i className="fa fa-star-half-o" aria-hidden="true"></i></li>))}
		</ul>
		)
}