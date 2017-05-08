import React from 'react';
import waypoint from 'react-waypoint';
import {
  Link,
} from "react-router-dom";
export default ({price}) => {
	return (
		<div className="bookingSideBar col-md-4 col-sm-12">
			<div>
				<p>{price}</p>
				<p>date</p>
				<p>guest</p>
			</div>
		</div>
	)
}