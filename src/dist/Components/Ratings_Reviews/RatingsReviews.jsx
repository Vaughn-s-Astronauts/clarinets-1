import React, {useState, useEffect} from 'react';
import axios from 'axios';
import git_api from '../../../../config.js';
import ReviewsList from './ReviewsList.jsx';

let RatingsReviews = ({product}) => {
  const [allReviews, setAllReviews] = useState([]);
  const [shownReviews, setShownReviews] = useState([]);
  const [reviewAmount, setReviewAmount] = useState(2);

  const getReviews = () => {
    let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/`;
    axios.get(url, {
      headers: {
      'Authorization': git_api(),
      },
      params: {
        page: 1,
        count: 1000,
        sort: "newest", //"newest", "helpful", or "relevant"
        product_id: product.id
    }}).then((response) => {
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