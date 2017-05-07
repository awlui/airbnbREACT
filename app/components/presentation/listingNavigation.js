import React from 'react';

import {
  Link,
} from "react-router-dom";
export default ({}) => {
	return (
		<div className="listingNavBar col-md-8 col-sm-12">
			<div>
			<ul>
				<li>
					<Link to="#">Overview</Link>
				</li>
				<li>
					<Link to="#">Reviews</Link>
				</li>
				<li>
					<Link to="#">The Host</Link>
				</li>
				<li>
					<Link to="#">Location</Link>
				</li>
			</ul>
			</div>
		</div>
	)
}