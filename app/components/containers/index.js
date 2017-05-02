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

export default class Application extends Component {


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
            <Autocomplete
    style={{width: '50%'}}
    className="googleSearch"
    onPlaceSelected={(place) => {
      console.log(place);
    }}
/>
        </Navbar>

      </div>
    );
  }
}