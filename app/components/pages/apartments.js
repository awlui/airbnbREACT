import React from 'react';
import Masonry from 'react-masonry-component';
import mapStore from '../../stores/mapStore';
let masonryOptions = {
    transitionDuration: '0.6s',
    columnWidth: 200
};

export default class Apartments extends React.Component {
	onHover = (evt, index) => {
		mapStore.dispatch({type: 'CHANGE_HIGHLIGHT', index});
	}
	render() {
		return (
			<Masonry
				className='my-gallery-class'
				elementType={'div'}
				>
				{this.props.listings.map((listing, index) => (
				<div onMouseOver={(e) => {this.onHover(e, index)}} className="listing col-lg-6 col-md-12">
					<p>{listing.listing.city}</p>
					<img src={listing.listing.picture_url} />
				</div>
				))}


			</Masonry>
		)
	}
}

