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
import SearchBox from "../../../node_modules/react-google-maps/lib/places/SearchBox";
import mapStore from '../../stores/mapStore.js';
import {default as airbnbAsync} from '../../sources/airbnbAsync';
import {default as mapActions} from '../../actions/mapActions';
import {default as constants} from '../../actions/constants';
import Apartments from './apartments';
import Autocomplete from 'react-google-autocomplete';
const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `10px`,
  marginLeft: `10px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={(e) => props.onMapLoad(e)}
    defaultZoom={4}
    onIdle={props.onIdle}
    onClick={props.onMapClick}
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
    <SearchBox
      ref={props.onSearchBoxLoad}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      inputPlaceholder="Search by place"
      inputStyle={INPUT_STYLE}
    />
  {props.listings.map((listing, index) => (
    <Marker 
      position={listing.listing.position}
      >
        {(index === props.currentInfoBox) && 
          <InfoBox options={{ closeBoxURL: ``, alignBottom: false, pixelOffset: new google.maps.Size(-150, -280),  boxClass: "listingContent" }} 
          key={index}>
          <div>
          <img src={listing.listing.picture_url} />
          <p>{listing.listing.neighborhood}</p>
          </div>
          </InfoBox>}
      </Marker>
    ))}
  {props.listings.map((listing, index) =>  (
    <InfoBox 
      position={listing.listing.position}
      key={index}
      options={{ closeBoxURL: ``, defaultAnimation: 2, enableEventPropagation: true, alignBottom: true, pixelOffset: new google.maps.Size(-35, -10), boxClass: (props.highlightNumber === index ? "selected" : null)}}
      >
      <div className="info" >
      <div onClick={(e) => {props.onInfoBoxClick(e, index)}} className="listingPrice">{listing.pricing.localized_currency + " " + listing.pricing.localized_nightly_price}</div>
      </div>
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
  handleMapLoad = (map) => {
    this._mapComponent = map;
  }
  handleSearchBoxLoad = (searchBox) => {
    this._searchBox = searchBox;
    console.log(searchBox);
  }
  handleIdle = () => {
    if (this._mapComponent && $(window).width() > 992 && (this.state.currentInfoBox === null)) {
      this.state.bounds['neLat'] = this._mapComponent.getBounds().getNorthEast().lat();
      this.state.bounds['neLng'] = this._mapComponent.getBounds().getNorthEast().lng();
      this.state.bounds['swLat'] = this._mapComponent.getBounds().getSouthWest().lat();
      this.state.bounds['swLng'] = this._mapComponent.getBounds().getSouthWest().lng();
    this.props.history.push(`search?neLat=${this.state.bounds['neLat']}`)
    mapStore.dispatch(mapActions.getByBounds(this.state.bounds, 0, 10));
    }

  }
  handleInfoBoxClick = (evt, index) => {
    mapStore.dispatch({type: constants.CHANGE_INFOBOX, index});
  }
  bootstrap = () => {
    mapStore.dispatch(mapActions.getBySearch("United States", 0, 10));
  }
  handleMapClick = () => {
    console.log('map click')
    mapStore.dispatch({type: constants.CHANGE_INFOBOX, index: null});
  }
  handlePlacesChanged = () => {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });
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
                center={this.state.center}
                onMapLoad={this.handleMapLoad}
                onSearchBoxLoad={this.handleSearchBoxLoad}
                onIdle={this.handleIdle} 
                markers={this.state.markers}
                listings={this.state.listings}
                highlightNumber={this.state.highlightNumber}
                onInfoBoxClick={this.handleInfoBoxClick}
                currentInfoBox={this.state.currentInfoBox}
                onMapClick={this.handleMapClick}
              />
            </div>
            <div className="apartments col-md-6 col-sm-12">
              <Apartments listings={this.state.listings} />
            </div>
          </div>
    );
  }
}