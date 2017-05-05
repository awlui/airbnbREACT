import _ from "lodash";

import React from 'react';

import {
  Grid
} from "react-bootstrap";

export default ({poster}) => {
	return (
		<Grid fluid style={{backgroundImage: `url(${poster})`}} className="jumbotron">
		</Grid>
	)
}