import React from 'react';
import Waypoint from 'react-waypoint';
export default ({hostInfo}) => {
	console.log(hostInfo)
	return (
	<div id="host" className="col-md-8 col-sm-12">
		<div className="col-xs-8">
			<Waypoint topOffset={50} onLeave={(waypoint) => {
				if (waypoint.currentPosition === "above" && waypoint.previousPosition === "inside") {
					$('.listingNavBar li').removeClass('currentSection');
					$('.listingNavBar li:nth-of-type(3)').addClass('currentSection');
				}
			}} onEnter={(waypoint) => {
				if (waypoint.currentPosition === "inside" && waypoint.previousPosition === "above") {
					$('.listingNavBar li').removeClass('currentSection');
					$('.listingNav li:nth-of-type(2)').addClass('currentSection');
				}

			}}/>
			<h3>{`Hosted By ${hostInfo.first_name}`}</h3>
			<span>{`${hostInfo.reviewee_count} ${hostInfo.reviewee_count === 1 ? 'review' : 'total reviews'}`}</span>
			{hostInfo.identify_verified ? <i class="fa fa-check-square-o" aria-hidden="true"></i> : null}

		</div>
		<img className="col-xs-4 img-responsive img-circle" src={hostInfo.picture_url}/>


	</div>
	)
}