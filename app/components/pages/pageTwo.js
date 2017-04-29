import _ from "lodash";

import React from 'react';

import Helmet from "react-helmet";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";




const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: 0, lng: -87.6500523 }}
    onClick={props.onMapClick}
  >
  </GoogleMap>
));

export default class pageTwo extends React.Component {


  handleMapLoad = this.handleMapLoad.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }


  render() {
    return (
      <div style={{height: `100%`}}>
        <Helmet
          title="Getting Started"
        />
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `500px`, width: `500px` }} />
          }
          mapElement={
            <div style={{ height: `500px`, width: `500px` }} />
          }
          onMapLoad={this.handleMapLoad}
        />
      </div>
    );
  }
}