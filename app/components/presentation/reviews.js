import React from 'react';

import listingStore from '../../stores/listingStore';
import listingActions from '../../actions/listingActions';
import constants from '../../actions/constants';
import Pagination from './pagination';
export default class Reviews extends React.Component {
	componentWillMount() {
		this.unsubscribe = listingStore.subscribe(() => {
			this.forceUpdate();
		});
		listingStore.dispatch(listingActions.getReviewsById(this.props.id));
	}
	componentWillUnmount() {
		this.unsubscribe();
	}
  changePage = (page) => {
    listingStore.dispatch({type: constants.CHANGE_PAGE, page});
    listingStore.dispatch(listingActions.getReviewsById(this.props.id, (page-1)*10, 10));
    return false;
  }
	render() {
		let reviews;
		if (this.props.reviewData !== null) {
			reviews = this.props.reviewData.reviews;

		}
		return (
			<div id="reviews" className="reviews col-md-8 col-sm-12">
				<h3>{`${this.props.reviewsCount} ${(this.props.reviewsCount > 1) ? 'reviews' : 'review'}`}</h3>
				{this.props.isFetchingReviews ? <p>Loading...</p> : null} 
				<ul>
					{reviews ? reviews.map((review, index) => 
						(<li key={index}>

							<img className="col-sm-3 col-xs-4 img-responsive img-circle" src={review.author.picture_url} />
							<p className="col-sm-9 col-xs-8">{review.author.first_name}</p>
							<p className="col-xs-12">{review.comments}</p>
						</li>)
					) : null}
				</ul>
				<Pagination listingsCount={this.props.reviewsCount} currentPage={this.props.currentPage} changePage={this.changePage} listingsPerPage={10} elId={"#reviews"}/>
			</div>
		)		
	}
}

