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
} from "react-bootstrap";

import {
  LinkContainer,
} from "react-router-bootstrap";



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
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">React Google Maps</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}