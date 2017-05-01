import React from 'react';
import Masonry from 'react-masonry-component';
let masonryOptions = {
    transitionDuration: '0.6s',
    columnWidth: 200
};

export default class Apartments extends React.Component {
	render() {
		return (
			<Masonry
				className={'my-gallery-class'}
				elementType={'div'}
				>
				{this.props.listings.map((listing, index) => (
				<div className="listing col-lg-6 col-md-12">
					<p>{listing.listing.city}</p>
					<img className="img-responsive" src={listing.listing.picture_url} />
				</div>
				))}


			</Masonry>
		)
	}
}

