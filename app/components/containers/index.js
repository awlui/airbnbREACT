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

import {
  LinkContainer,
} from "react-router-bootstrap";

import Autocomplete from 'react-google-autocomplete';

import Helmet from "react-helmet";
import {default as mapActions} from '../../actions/mapActions';
import mapStore from '../../stores/mapStore.js';

export default class Application extends Component {
  handleOnPlaceChange = () => {
    console.log(this._searchBox);
    const places = this._searchBox.getPlaces();

    mapStore.dispatch(mapActions.getBySearch(places[0].name, 0, 10, places[0].geometry.viewport));
  }
  handleSearchBoxLoad = (searchBox) => {
    this._searchBox = searchBox;
    console.log(searchBox)
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
            <Autocomplete
              style={{width: '50%'}}
              className="googleSearch"
              ref={this.handleSearchBoxLoad}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
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