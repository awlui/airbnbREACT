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
  {props.listings.map((listing) => (
    <Marker 
      position={listing.position}
      />
    ))}
  {props.listings.map((listing, index) =>  (
    <InfoBox 
      position={listing.listing.position}
      options={{ closeBoxURL: ``, alignBottom: true, pixelOffset: new google.maps.Size(-50, -10), boxClass: (props.highlightNumber === index ? "selected" : null)}}
      >
      <div className="info"><div className="infoContent">{listing.pricing.localized_currency + " " + listing.pricing.localized_nightly_price}</div></div>
    </InfoBox>
    )    
    )}
  </GoogleMap>
));

export default class pageOne extends React.Component {
  componentDidMount() {
    this.unsubscribe = mapStore.subscribe(() => {
      this.forceUpdate();
    });
    this.bootstrap();
  }
  componentWillUnmount() {
    this.unsubscribe();

  }
  setMapState = (map) => {
    this._mapComponent = map;
  }
  handleIdle = () => {
    if (this._mapComponent && $(window).width() > 992) {
      this.state.bounds['neLat'] = this._mapComponent.getBounds().getNorthEast().lat();
      this.state.bounds['neLng'] = this._mapComponent.getBounds().getNorthEast().lng();
      this.state.bounds['swLat'] = this._mapComponent.getBounds().getSouthWest().lat();
      this.state.bounds['swLng'] = this._mapComponent.getBounds().getSouthWest().lng();
    this.props.history.push(`search?neLat=${this.state.bounds['neLat']}`)
    mapStore.dispatch(mapActions.getByBounds(this.state.bounds, 0, 10));
    }

  }
  bootstrap = () => {
    mapStore.dispatch(mapActions.getBySearch("United States", 0, 10));
  }
  render() {
    this.state = mapStore.getState();
    return (
          <div style={{height: `100%`}}>
            <div style={{height: `100%`}} className="mapContainer col-md-6 col-sm-12">
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
                highlightNumber={this.state.highlightNumber}
              />
            </div>
            <div className="apartments col-md-6 col-sm-12">
              <Apartments listings={this.state.listings} />
            </div>
          </div>
    );
  }
}