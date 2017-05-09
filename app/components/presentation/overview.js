import React from 'react';
import Stars from '../presentation/stars';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from "react-google-maps";
import Waypoint from 'react-waypoint';




export default ({listing}) => {
	return (
	<div id="overview" className="col-md-8 col-sm-12">
		<Waypoint topOffset={50} onLeave={(waypoint) => {
			if (waypoint.currentPosition === "above" && waypoint.previousPosition === "inside") {
				$('.listingNavBar li:nth-of-type(1)').addClass('currentSection');
			}
		}} onEnter={(waypoint)=> {
			if (waypoint.currentPosition === "inside" && waypoint.previousPosition === "above") {
				$('.listingNavBar li').removeClass('currentSelection');
			}
		}}/>
		<div className="hostInfo">
			<div className="col-md-8 col-sm-12">
			<h2>{listing.name}</h2>
			<p>{`${listing.city}, ${listing.country}`}</p>
			<Stars rating={listing.star_rating}/>
			<p>{`${listing.reviews_count} reviews`}</p>
			</div>
			<img src={listing.user.user.picture_url} className="col-md-4 col-md-offset-0 col-sm-8 col-sm-offset-2 img-responsive img-circle" />
		</div>
		<div className="apartmentIcons">
			<div className="col-xs-4">
				<i className="fa-3x fa fa-home" aria-hidden="true"></i>
				<p>{listing.room_type}</p>
			</div>
			<div className="col-xs-4">
				<i className="fa-3x fa fa-users" aria-hidden="true"></i>
				<p>{`${listing.guests_included} ${(listing.guests_included > 1) ? 'guests' : 'guest'}`}</p>
			</div>
			<div className="col-xs-4">
				<i className="fa-3x fa fa-bed" aria-hidden="true"></i>
				<p>{`${listing.beds} ${(listing.beds > 1) ? 'beds' : 'bed'}`}</p>
			</div>
		</div>
		<div className="apartmentDescription">
			<h3>About this listing</h3>
			<p>{listing.summary}</p>
		</div>
		<div className="summary">
			<div className="theSpace">
				<p className="col-sm-2 col-xs-12">
					The Space
				</p>
				<div className="col-sm-4 col-xs-12">
					<ul>
						<li>{`Accomodates: ${listing.guests_included}`}</li>
						<li>{`Bathrooms: ${listing.bathrooms}`}</li>
						<li>{`Bedrooms: ${listing.bedrooms}`}</li>
						<li>{`Beds: ${listing.beds}`}</li>
						{listing.localized_check_in_time_window ? <li>{`Check In: ${listing.localized_check_in_time_window}`}</li> : null}
					</ul>
				</div>
				<div className="col-sm-4 col-xs-12">
					<ul>
						{listing.localized_check_out_time ? <li>{`Check Out: ${listing.localized_check_out_time}`}</li> : null}
						<li>{`Property Type: ${listing.property_type}`}</li>
						<li>{`Room Type: ${listing.room_type}`}</li>
					</ul>
				</div>
			</div>
			<div className="amenities">
				<div>
					<p className="col-sm-2 col-xs-12">
						Amenities
					</p>
					<div>
					<ul className="col-sm-10 col-xs-12">
						{listing.amenities.map((amenity) => (<li>{amenity}</li>))}
					</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	)
};