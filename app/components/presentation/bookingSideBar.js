import React from 'react';
import waypoint from 'react-waypoint';
import {
  Link,
} from "react-router-dom";
export default ({price, guestNumber}) => {
	return (
		<div className="bookingSideBar col-md-4 col-sm-12">
			<div>
				<p>{`${price} per night`}</p>
				<p>Date PlaceHolder</p>
				<p>{`${guestNumber} ${guestNumber === 1 ? 'guest' : 'guests'}`}</p>
			</div>
		</div>
	)
}