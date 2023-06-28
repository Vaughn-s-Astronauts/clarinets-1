import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import API from '../../helpers/API.js';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import RatingEntry from './RatingEntry.jsx'

let RatingBreakdown = ({ratings, filterReviews}) => {
  let recommendedPercent = 0;
  let avgRating = 0;
  let totalRatings = 0;

  if (ratings.recommended) {
    recommendedPercent = ratings.recommended.true / (parseInt(ratings.recommended.true)+parseInt(ratings.recommended.false))*100;
    recommendedPercent = Math.round(recommendedPercent);
  }
  if (ratings.ratings) {
    console.log('values', Object.values(ratings.ratings).reverse());
    for (let i in ratings.ratings) {
      totalRatings += parseInt(ratings.ratings[i]);
    }
    for (let i in ratings.ratings) {
      avgRating += i*(ratings.ratings[i]);
    }
    avgRating /= totalRatings;
  }

  console.log('ratings child',ratings);


  const handleClick = (key) => {
    console.log(key);
  }


  const handleMouseOver = (e) => {
    console.log(e.target);
  }

  const handleMouseOut = (e) => {
    console.log(e.target);
  }
  



  return (
    <div>
      {avgRating.toFixed(1)}
      <Rating name="read-only" value={avgRating} precision={0.25} readOnly />
      ({totalRatings} reviews)
      {ratings.ratings && Object.values(ratings.ratings).reverse().map((rating, i) => (
        <RatingEntry key={i} i={5-i} rating={rating} totalRatings={totalRatings} filterReviews={filterReviews}/>
      ))}
      
      <div>{recommendedPercent}% of reviewers recommend this product.</div>
    </div>
  )
}

export default RatingBreakdown;