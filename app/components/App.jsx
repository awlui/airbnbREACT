import {
  default as React,
  Component,
} from "react";
import { Grid } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link

} from "react-router-dom";



import Application from "./containers";

import pageOne from './pages/pageOne';

import pageTwo from './pages/pageTwo';
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Application />
          <Link to="/">pageOne</Link>
          <Link to="next">pageTwo</Link>
            <Grid style={{height: `100%`}} fluid>
              <div style={{height: `100%`}} className="col-lg-6 full-height">
              <Switch>
                <Route exact path="/" component={pageOne} />
                <Route exact path="/next" component={pageTwo} />
              </Switch>
              </div>
            </Grid>
        </div>
      </Router>
    );
  }
}