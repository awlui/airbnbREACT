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
console.log(InfoBox, 'infobox')
import mapStore from '../../stores/mapStore.js';
import {default as airbnbAsync} from '../../sources/airbnbAsync';
import {default as mapActions} from '../../actions/mapActions';
import {default as constants} from '../../actions/constants';
mapStore.dispatch(mapActions.getBySearch('Los Angeles', 0))
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
        mapTypeControl: false
      }
    }
  >
  {props.markers.map((marker) => (
    <Marker 
      {...marker}
      />
    ))}
  </GoogleMap>
));

export default class pageOne extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        markers: [{
          position: {
            lat: 25.0112183,
            lng: 121.52067570000001
          },
          key: 'Taiwan',
          defaultAnimation: 2
        }]

      };
      this.state.bounds = {
        'neLat': '',
        'neLng': '',
        'swLat': '',
        'swLng': ''
      }
      this.state.value = "United States";

  }
  setMapState = (map) => {
    this._mapComponent = map;
  }
  handleIdle = () => {
    if (this._mapComponent) {
      this.state.bounds['neLat'] = this._mapComponent.getBounds().getNorthEast().lat();
      this.state.bounds['neLng'] = this._mapComponent.getBounds().getNorthEast().lng();
      this.state.bounds['swLat'] = this._mapComponent.getBounds().getSouthWest().lat();
      this.state.bounds['swLng'] = this._mapComponent.getBounds().getSouthWest().lng();
    }
    mapStore.dispatch(mapActions.getByBounds(this.state.bound, 0));
    this.newBounds();
  }
  newBounds = () => {
    this.state.markers = [...this.state.markers, 
    {position: {
      lat: this.state.bounds['neLat'],
      lng: this.state.bounds['neLng']
      },
    defaultAnimation: 2
    },
    {
      position: {
        lat: this.state.bounds['swLat'],
        lng: this.state.bounds['swLng']
      },
      defaultAnimation: 2
    }];
    this.setState({
      markers: this.state.markers
    })
  };

  render() {
    return (
      <div style={{height: `100%`}}>
        <Helmet
          title="Getting Started"
        />
        <input type="text" 
          ref={
          (e) => e ? e.selectionStart = this.state.value.length : null
          }
         autoFocus={true}
         defaultValue={this.state.value}
         />
        <GettingStartedGoogleMap
          containerElement={
            <div id="map" style={{ height: `80%`, width: `90%` }} />
          }
          mapElement={
            <div style={{ height: `100%`, width: `100%` }} />
          }
          onMapLoad={this.setMapState}
          onIdle={this.handleIdle} 
          markers={this.state.markers}
        />
      </div>
    );
  }
}