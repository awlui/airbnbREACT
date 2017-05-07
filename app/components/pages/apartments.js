import React from 'react';
import Masonry from 'react-masonry-component';
import mapStore from '../../stores/mapStore';
import Stars from '../presentation/stars';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect

} from "react-router-dom";
let masonryOptions = {
    transitionDuration: '0.6s',
    columnWidth: 200
};

export default class Apartments extends React.Component {
	onHover = (evt, index) => {
		mapStore.dispatch({type: 'CHANGE_HIGHLIGHT', index});
	}
	onClick = (id) => {
		this.props.history.push(`listing?id=${id}`)
	}
	render() {
		return (
			<Masonry
				className='apartments-mosaic'
				elementType={'div'}
				>
				{this.props.listings.map((listing, index) => (
				<div key={index} onClick={(e) => this.onClick(listing.listing.id)} onMouseOver={(e) => {this.onHover(e, index)}} className="listing col-lg-6 col-md-6 col-sm-12">
					<img src={listing.listing.picture_url} />
					<p>{listing.listing.name}</p>
					<p>{listing.pricing.rate.amount_formatted}</p>
					{listing.listing.star_rating ? <Stars rating={listing.listing.star_rating} /> : null }
				</div>
				))}


			</Masonry>
		)
	}
}

