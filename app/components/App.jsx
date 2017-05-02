import {
  default as React,
  Component,
} from "react";
import { Grid } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect

} from "react-router-dom";



import Application from "./containers";

import pageOne from './pages/pageOne';
import apartments from './pages/apartments';
import pageTwo from './pages/pageTwo';
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Application />
          <Grid className="content" style={{height: `100%`, width: '100%'}} fluid>
            <div style={{height: `100%`, width: '100%'}} >
            <Switch>
              <Route exact path="/" component={pageOne} />
              <Route path="/search" component={pageOne} />
              <Route exact path="/next" component={pageTwo} />
              <Redirect path="*" to="/" />
            </Switch>
            </div>
          </Grid>
        </div>
      </Router>
    );
  }
}