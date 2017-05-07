import _ from "lodash";

import React from 'react';

import Helmet from "react-helmet";
import queryString from 'query-string';
import listingStore from '../../stores/listingStore';
import constants from '../../actions/constants';
import listingActions from '../../actions/listingActions';
import mapStore from '../..//stores/mapStore';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect

} from "react-router-dom";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from "react-google-maps";
import {
  Grid
} from "react-bootstrap";
import Jumbotron from '../presentation/jumbotron';
import ListingNavigation from '../presentation/ListingNavigation';
import BookingSideBar from '../presentation/bookingSideBar';
import Overview from '../presentation/overview';
import Reviews from '../presentation/reviews';

const GoogleMapContainer = withGoogleMap(props => (
  <GoogleMap
    center={props.center}
    zoom={11}
    defaultOptions={
      {
        styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#55B0C8'}]
            }
        ],
        mapTypeControl: false,
        scrollwheel: false,
      }
    }
  >
  {props.center && (
  	<Circle
  		center={props.center}
  		radius={6000}
  		options={{
  			fillColor: `rgb(253,92,99)`,
  			fillOpacity: 0.20,
  			strokeColor: `red`,
  			strokeOpacity: 1,
  			strokeWeight: 1
  		}}
  		/>
  	)}
  </GoogleMap>
));



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
		mapStore.dispatch({type: constants.CHANGE_ROUTE, page: 'listing'})
		let parsed = queryString.parse(this.props.location.search);
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
		return (
			<div className={this.state.isFetching ? "room loading" : "room"}>
				<Jumbotron poster={this.state.data.photos[0].xx_large} />
				<div className="wrapper">
					<ListingNavigation />
					<BookingSideBar />
					<Overview listing={this.state.data} />
					<Reviews listing={this.state.data} />
					<div className="neighborhood col-md-8">
						  <h3>The neighborhood</h3>
				          <GoogleMapContainer
				            containerElement={
				              <div id="listingMap"/>
				            }
				            mapElement={
				              <div style={{ height: `100%`, width: `95%` }} />
				            }
				            center={{lat: this.state.data.lat, lng: this.state.data.lng}}

				          />
					</div>
				</div>
			</div>
		)
		} else {
			return (
				<div>...loading</div>
			)
		}
	}
}