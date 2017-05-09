import React from 'react';
import {
  Link,
} from "react-router-dom";
import smoothScrolling from '../../helpers/smoothScrolling';

export default class listingNavigation extends React.Component {
	componentDidMount() {
		smoothScrolling();
	}
	render() {
	return (
		<div className="listingNavBar col-md-8 col-sm-12">
			<div>
			<ul>
				<li>
					<a href="#overview">Overview</a>
				</li>
				<li>
					<a href="#reviews">Reviews</a>
				</li>
				<li>
					<a href="#host">The Host</a>
				</li>
				<li>
					<a href="#neighborhood">Location</a>
				</li>
			</ul>
			</div>
			<div className="container-fluid">
				<h3><a href="#root">Airbnb React</a></h3>
			</div>
		</div>
	)
	}







}