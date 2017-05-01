import _ from "lodash";

import React from 'react';

import Helmet from "react-helmet";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import InfoBox from "../../../node_modules/react-google-maps/lib/addons/InfoBox";
import mapStore from '../../stores/mapStore.js';
import {default as airbnbAsync} from '../../sources/airbnbAsync';
import {default as mapActions} from '../../actions/mapActions';
import {default as constants} from '../../actions/constants';
import Apartments from './apartments';
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={(e) => props.onMapLoad(e)}
    defaultZoom={4}
    onIdle={props.onIdle}
    defaultCenter={{ lat: 39.8282, lng: -98.5795 }}
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
  {props.markers.map((marker) => (
    <Marker 
      {...marker }
      />
    ))}
  {props.listings.map((listing) => (
    <InfoWindow 
      {...listing.listing }
      >
      <div>{listing.pricing.localized_currency + " " + listing.pricing.localized_nightly_price}</div>
    </InfoWindow>
    ))}
  </GoogleMap>
));

export default class pageOne extends React.Component {
  componentDidMount() {
    this.unsubscribe = mapStore.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  setMapState = (map) => {
    this._mapComponent = map;
  }
  handleIdle = () => {
    console.log(this._mapComponent)
    if (this._mapComponent) {
      this.state.bounds['neLat'] = this._mapComponent.getBounds().getNorthEast().lat();
      this.state.bounds['neLng'] = this._mapComponent.getBounds().getNorthEast().lng();
      this.state.bounds['swLat'] = this._mapComponent.getBounds().getSouthWest().lat();
      this.state.bounds['swLng'] = this._mapComponent.getBounds().getSouthWest().lng();
    }
    this.props.history.push(`search?neLat=${this.state.bounds['neLat']}`)
    mapStore.dispatch(mapActions.getByBounds(this.state.bounds, 0, 10));
  }

  render() {
    this.state = mapStore.getState();
    return (
          <div style={{height: `100%`}}>
            <div style={{height: `100%`}} className="col-sm-6 col-xs-12">
              <Helmet
                title="React Maps"
              />
              <GettingStartedGoogleMap
                containerElement={
                  <div id="map"/>
                }
                mapElement={
                  <div style={{ height: `100%`, width: `95%` }} />
                }
                onMapLoad={this.setMapState}
                onIdle={this.handleIdle} 
                markers={this.state.markers}
                listings={this.state.listings}
              />
            </div>
            <div className="col-sm-6 col-xs-12">
              <Apartments listings={this.state.listings} />
            </div>
          </div>
    );
  }
}