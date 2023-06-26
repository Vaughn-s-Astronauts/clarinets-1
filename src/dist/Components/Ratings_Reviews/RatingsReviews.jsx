import React, {useState, useEffect} from 'react';
import git_api from '../../../../config.js';
import ReviewsList from './ReviewsList.jsx';
import API from '../../helpers/API.js';

let RatingsReviews = ({product}) => {
  const [allReviews, setAllReviews] = useState([]);
  const [shownReviews, setShownReviews] = useState([]);
  const [reviewAmount, setReviewAmount] = useState(2);

  const getReviews = () => {
    API.GET_REVIEWS(product.id, 1, 1000, 'newest').then((response) => {
      setAllReviews(response.data.results);
      setShownReviews(response.data.results.slice(0, 2));
    }).catch((error) => {
      console.log(error);
    });
  }


    const showMoreReviews = () => {
      setReviewAmount(reviewAmount+2);
    }

    React.useEffect(() => {
      getReviews();
    }, []);

    React.useEffect(() => {
      setShownReviews(allReviews.slice(0, reviewAmount));
    }, [reviewAmount]);


  return (
    <div style={{border: 'solid red'}}>
      <h2>Reviews for {product.name}</h2>
      <ReviewsList shownReviews={shownReviews}/>

      {(reviewAmount < allReviews.length && allReviews.length > 2) ?
      <button onClick={showMoreReviews}>More reviews</button>
      : <div> All reviews displayed </div>}
    </div>);
};

export default RatingsReviews;