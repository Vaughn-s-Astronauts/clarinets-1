import React from 'react';
import Rating from '@mui/material/Rating';

let ReviewEntry = ({review}) => {

  return (
    <div style={{border: "solid black"}}>
      <div>Rating: {review.rating}</div>
      <Rating name="read-only" value={review.rating} precision={0.25} readOnly />
      <div>{review.body}</div>
    </div>
  )
}

export default ReviewEntry;