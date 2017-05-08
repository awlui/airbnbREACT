import _ from "lodash";

import React from 'react';

import Helmet from "react-helmet";
import queryString from 'query-string';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import InfoBox from "../../../node_modules/react-google-maps/lib/addons/InfoBox";
import SearchBox from "../../../node_modules/react-google-maps/lib/places/SearchBox";
import mapStore from '../../stores/mapStore';
import airbnbAsync from '../../sources/airbnbAsync';
import mapActions from '../../actions/mapActions';
import {default as constants} from '../../actions/constants';
import Apartments from './apartments';
import Pagination from '../presentation/pagination';
import Stars from '../presentation/stars';
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
import $ from 'jquery';
function padBounds(map, npad, spad, epad, wpad) {
    var SW = map.getBounds().getSouthWest();
    var NE = map.getBounds().getNorthEast();
    var topRight = map.getProjection().fromLatLngToPoint(NE);
    var bottomLeft = map.getProjection().fromLatLngToPoint(SW);
    var scale = Math.pow(2, map.getZoom());

    var SWtopoint = map.getProjection().fromLatLngToPoint(SW);
    var SWpoint = new google.maps.Point(((SWtopoint.x - bottomLeft.x) * scale) + wpad, ((SWtopoint.y - topRight.y) * scale) - spad);
    var SWworld = new google.maps.Point(SWpoint.x / scale + bottomLeft.x, SWpoint.y / scale + topRight.y);
    var pt1 = map.getProjection().fromPointToLatLng(SWworld);

    var NEtopoint = map.getProjection().fromLatLngToPoint(NE);
    var NEpoint = new google.maps.Point(((NEtopoint.x - bottomLeft.x) * scale) - epad, ((NEtopoint.y - topRight.y) * scale) + npad);
    var NEworld = new google.maps.Point(NEpoint.x / scale + bottomLeft.x, NEpoint.y / scale + topRight.y);
    var pt2 = map.getProjection().fromPointToLatLng(NEworld);

    return new google.maps.LatLngBounds(pt1, pt2);
}
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    onIdle={props.onIdle}
    onClick={props.onMapClick}
    center={props.center}
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
      onPlacesChanged={props.onPlacesChanged}
    />
  {props.listings.map((listing, index) => (
    <Marker 
      position={listing.listing.position}
      key={index}
      >
        {(index === props.currentInfoBox) && 
          <InfoBox onDomReady={() => { document.getElementById('activeInfoBox').addEventListener('click', function() {
            props.onClick(listing.listing.id);
          })}} options={{ closeBoxURL: ``, alignBottom: false, pixelOffset: new google.maps.Size(-150, -280), enableEventPropagation: false,  boxClass: "listingInfoBox" }} 
          key={index}>
          <div id="activeInfoBox">
          <img src={listing.listing.picture_url} />
          <p>{listing.listing.name}</p>
          <p>{listing.pricing.rate.amount_formatted}</p>
          {listing.listing.star_rating ? <Stars rating={listing.listing.star_rating} /> : null }
          </div>
          </InfoBox>}
      </Marker>
    ))}
  {props.listings.map((listing, index) =>  (
    <InfoBox 
      position={listing.listing.position}
      key={index}
      options={{ closeBoxURL: ``, enableEventPropagation: true, alignBottom: true, pixelOffset: new google.maps.Size(-35, -10), boxClass: (props.highlightNumber === index ? "selected" : null)}}
      >
      <div className="info" >
      <div onClick={(e) => {props.onInfoBoxClick(e, index)}} className="listingPrice">{listing.pricing.rate.amount_formatted}</div>
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
  }
  handleIdle = () => {
    if (this._mapComponent && $(window).width() > 992 && (this.state.currentInfoBox === null) && (this.state.isFetching === false)) {
      if (this.state.appSize === "mobile") {
        this._mapComponent.fitBounds(this.state.bounds);
        this._searchBox._inputElement.value = this.state.location || "";
        this.forceUpdate();
        mapStore.dispatch({type: constants.CHANGE_SIZE, size: "desktop"});
        return;
      }
      let paddedBounds = padBounds(this._mapComponent, 100, 100, 100, 100);
      this.props.history.push(`search?neLat=${this._mapComponent.getBounds().getNorthEast().lat()}&neLng=${this._mapComponent.getBounds().getNorthEast().lng()}&swLat=${this._mapComponent.getBounds().getSouthWest().lat()}&swLng=${this._mapComponent.getBounds().getSouthWest().lng()}`)
      mapStore.dispatch(mapActions.getByBounds(paddedBounds, 0, 10));
      mapStore.dispatch({type: constants.CHANGE_PAGE, page: 1});
    }

    if ($(window).width() < 992) {
      mapStore.dispatch({ type: constants.CHANGE_SIZE, size: "mobile" });
    }

  }
  handleInfoBoxClick = (evt, index) => {
    mapStore.dispatch({type: constants.CHANGE_INFOBOX, index});
    mapStore.dispatch({type: constants.CHANGE_HIGHLIGHT, index});
  }
  bootstrap = () => {
    mapStore.dispatch({type: constants.CHANGE_ROUTE, page: 'homepage'});
      let parsed = queryString.parse(this.props.location.search);
      let bounds;
      if (!_.isEmpty(parsed)) {
        if (_.isEqual(Object.keys(parsed).sort(), ["neLat", "neLng", "swLat", "swLng"].sort())) {
          bounds = new google.maps.LatLngBounds({lat: parseFloat(parsed["swLat"], 10), lng: parseFloat(parsed["swLng"], 10)}, {lat: parseFloat(parsed["neLat"], 10), lng: parseFloat(parsed["neLng"], 10)});
          mapStore.dispatch(mapActions.getByBounds(bounds, 0, 10));
        } 
      } else {
        //Use bounds instead
          mapStore.dispatch(mapActions.getByBounds(this.state.bounds, 0, 10));
      }
  }
  handleMapClick = () => {
    mapStore.dispatch({type: constants.CHANGE_INFOBOX, index: null});
    mapStore.dispatch({type: constants.CHANGE_HIGHLIGHT, index: null});
  }
  handlePlacesChanged = () => {
    const places = this._searchBox.getPlaces();
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    let queryString;
    this._mapComponent.fitBounds(places[0].geometry.viewport)
    mapStore.dispatch(mapActions.getBySearch(places[0].name, 0, 10, places[0].geometry.viewport));
    mapStore.dispatch({type: constants.CHANGE_PAGE, page: 1});
    queryString = `search?neLat=${places[0].geometry.viewport.getNorthEast().lat()}&neLng=${places[0].geometry.viewport.getNorthEast().lng()}&swLat=${places[0].geometry.viewport.getSouthWest().lat()}&swLng=${places[0].geometry.viewport.getSouthWest().lng()}`
    if (this.state.startDate) {
      queryString += `&checkin=${this.state.startDate}`;
    }
    if (this.state.endDate) {
      queryString += `&checkout=${this.state.endDate}`;
    }
    this.props.history.push(queryString);
  }
  changePage = (page) => {
    mapStore.dispatch({type: constants.CHANGE_PAGE, page});
    mapStore.dispatch(mapActions.getByBounds(this.state.bounds, (page-1)*10, 10));
  }
  onClick = (id) => {
    this.props.history.push(`listing?id=${id}`)
  }
  render() {
    this.state = mapStore.getState();
    return (
          <div style={{height: `100%`}}>
            <div style={{height: `100%`}} className="mapContainer col-md-5 col-sm-12">
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
                center={this.state.mapCenter}
                onPlacesChanged={this.handlePlacesChanged}
                onClick={this.onClick}
              />
            </div>
            <div className={this.state.isFetching ? ' apartments col-md-7 col-sm-12 loading' : 'apartments col-md-7 col-sm-12'}>
              {this.state.noResults ? <h2>No Results Found</h2> : (<div><Apartments history={this.props.history} listings={this.state.listings} /><Pagination listingsCount={this.state.listingsCount} currentPage={this.state.currentPage} changePage={this.changePage} listingsPerPage={10}/></div>) }
            </div>
          </div>
    );
  }
}