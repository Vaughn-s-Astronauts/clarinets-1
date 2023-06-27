import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import API from '../../helpers/API.js';

let RatingBreakdown = ({ratings}) => {
  console.log(ratings);
  let avgRating = 0;
  let totalRatings = 0;
  if (ratings !== {}) {
    for (let i in ratings) {
      totalRatings += parseInt(ratings[i]);
    }
    for (let i in ratings) {
      avgRating += i*(ratings[i]);
    }
    avgRating /= totalRatings;
    console.log('final', avgRating);
  }

  console.log('ratings in child component',ratings);



  return (
    <div>
      {avgRating.toFixed(1)}
      <Rating name="read-only" value={avgRating} precision={0.25} readOnly />
      ({totalRatings} reviews)
    </div>
  )
}

export default RatingBreakdown;