import {
  default as React,
  Component,
  PropTypes,
  Children,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Toggle
} from "react-bootstrap";

import Geosuggest from 'react-geosuggest';
import {
  LinkContainer,
} from "react-router-bootstrap";


import Helmet from "react-helmet";
import {default as mapActions} from '../../actions/mapActions';
import mapStore from '../../stores/mapStore.js';

export default class Application extends Component {
  handleOnPlaceChange = () => {
    console.log(this._searchBox);
    const places = this._searchBox.getPlaces();

    mapStore.dispatch(mapActions.getBySearch(places[0].name, 0, 10, places[0].geometry.viewport));
  }
  onSuggestSelect = (suggest) => {
    mapStore.dispatch(mapActions.getBySearch(suggest.gmaps.formatted_address, 0, 10, suggest.gmaps.geometry.viewport))
  }
  render() {
    return (
      <div>
        <Helmet
          titleTemplate="React Maps"
          meta={[
            { name: `viewport`, content: `width=device-width, initial-scale=1` }
          ]}
        />
        <Navbar fluid className="navbar-fixed-top">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">React Google Maps</Link>
            </Navbar.Brand>
          </Navbar.Header>
            <Geosuggest 
              ref={el=> this._searchBox=el}
              placeholder="Search Location"
              onSuggestSelect={this.onSuggestSelect}
              skipSuggest={() => true}
            />
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <NavItem>
                <Link to="/">Page One</Link>
              </NavItem>
              <NavItem>
                <Link to="/next">Page Two</Link>
              </NavItem>
              <NavItem>
              </NavItem>
            </Nav>
          </Navbar.Collapse>

        </Navbar>

      </div>
    );
  }
}