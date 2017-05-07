import React from 'react';

export default ({listing}) => {
	return (
		<div className="reviews col-md-8 col-sm-12">
			<h3>{`${listing.reviews_count} ${(listing.reviews_count > 1) ? 'reviews' : 'review'}`}</h3>
		</div>

	)
}