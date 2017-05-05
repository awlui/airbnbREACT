import _ from "lodash";

import React from 'react';

import Helmet from "react-helmet";
import queryString from 'query-string';
import listingStore from '../../stores/listingStore';
import listingActions from '../../actions/listingActions';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect

} from "react-router-dom";
import {
  Grid
} from "react-bootstrap";
import Jumbotron from '../presentation/jumbotron';
export default class Listing extends React.Component {
	componentWillMount() {
		this.bootstrap();
		this.unsubscribe = listingStore.subscribe(() => {
			this.forceUpdate();
		});
	};
	componentWillUnmount() {
		this.unsubscribe();
	};
	bootstrap = () => {
		let parsed = queryString.parse(this.props.location.search);
		console.log('bootstrap')
		if (parsed.id) {
			listingStore.dispatch(listingActions.getListingById(parsed.id));
		}
	};
	render() {
		this.state = listingStore.getState();
		if (this.state.error) {
			return (
				<div>
					<h1>404 ERROR</h1>
					<Link to="/">Go Back To Homepage</Link>
				</div>
			)
		} else if (this.state.data) {
			console.log(this.state.data.xx_picture_url)
		return (
			<div className={this.state.isFetching ? "room loading" : "room"}>
				<Jumbotron poster={this.state.data.photos[0].xx_large} />
			</div>
		)
		} else {
			return (
				<div>...loading</div>
			)
		}
	}
}