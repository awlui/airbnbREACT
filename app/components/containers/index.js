import {
  default as React,
  Component,
  PropTypes,
  Children,
} from "react";
import moment from 'moment';
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
import constants from '../../actions/constants';
import Geosuggest from 'react-geosuggest';


import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import Helmet from "react-helmet";
import mapActions from '../../actions/mapActions';
import mapStore from '../../stores/mapStore';
export default class Application extends Component {
  componentWillMount() {
    this.unsubscribe = mapStore.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleOnPlaceChange = () => {
    const places = this._searchBox.getPlaces();

    mapStore.dispatch(mapActions.getBySearch(places[0].name, 0, 10, places[0].geometry.viewport));
  }
  onSuggestSelect = (suggest) => {
    mapStore.dispatch(mapActions.getBySearch(suggest.gmaps.formatted_address, 0, 10, suggest.gmaps.geometry.viewport));
    mapStore.dispatch({type: constants.CHANGE_PAGE, page: 1});
  }
  handleApply = (e, picker) => {
    let queryString, bounds;
    console.log(picker, 'picker');
    if (isNaN(moment(picker.startDate)) || (isNaN(moment(picker.endDate)))) {
      return;
    }
    bounds = mapStore.getState().bounds;
    queryString = queryString = `search?neLat=${bounds.getNorthEast().lat()}&neLng=${bounds.getNorthEast().lng()}&swLat=${bounds.getSouthWest().lat()}&swLng=${bounds.getSouthWest().lng()}`;
    queryString += `&checkin=${moment(picker.startDate).format('YYYY-MM-DD')}`;
    queryString += `&checkout=${moment(picker.endDate).format('YYYY-MM-DD')}`;
    this.props.history.push(queryString);
    console.log(moment(picker.startDate), "startDate");
    mapStore.dispatch(mapActions.getByBounds(mapStore.getState().bounds, 0, 10, moment(picker.startDate), moment(picker.endDate)));
  }
  onHomePage = () => {
    if (this.state.currentRoute === 'homepage') {
      return (
        <div>
        <Geosuggest 
          ref={el=> this._searchBox=el}
          placeholder="Search Location"
          onSuggestSelect={this.onSuggestSelect}
          skipSuggest={() => true}
        />
        <DatetimeRangePicker
          onApply={(e, picker) => { this.handleApply(e, picker)}}
          minDate={moment(new Date())}
          className="dateRange"
        >

            <input type="text" value={(!isNaN(this.state.startDate) && !isNaN(this.state.endDate)) ? this.state.startDate.format('MMM-DD') + " - " + this.state.endDate.format('MMM-DD') : "AnyTime" }/>
            <button>
                <i className="fa fa-calendar"/> &nbsp;
                <i className="fa fa-angle-down"/>
            </button>
        </DatetimeRangePicker>

        </div>

      )
    }
  }
  render() {
    this.state = mapStore.getState();
    return (
      <div>
        <Helmet
          titleTemplate="React Maps"
          meta={[
            { name: `viewport`, content: `width=device-width, initial-scale=1` }
          ]}
        />
        <Navbar fluid className={this.state.currentRoute === 'listing' ? 'navbar-top' : 'navbar-fixed-top'}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Airbnb React</Link>
            </Navbar.Brand>
          </Navbar.Header>
          {this.onHomePage()}
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="tabs">
              <NavItem>
                <Link to="/">Page One</Link>
              </NavItem>
              <NavItem>
                <Link to="/next">Page Two</Link>
              </NavItem>
              <NavItem>
                <Link to="/listing">Listing</Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>

        </Navbar>

      </div>
    );
  }
}