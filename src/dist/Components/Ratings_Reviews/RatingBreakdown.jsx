import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import RatingEntry from './RatingEntry.jsx'

let RatingBreakdown = ({ratings, addFilter, removeFilter, filter}) => {
  let recommendedPercent = 0;
  let avgRating = 0;
  let totalRatings = 0;

  if (ratings.recommended) {
    recommendedPercent = ratings.recommended.true / (parseInt(ratings.recommended.true)+parseInt(ratings.recommended.false))*100;
    recommendedPercent = Math.round(recommendedPercent);
  }
  if (ratings.ratings) {
    for (let i in ratings.ratings) {
      totalRatings += parseInt(ratings.ratings[i]);
    }
    for (let i in ratings.ratings) {
      avgRating += i*(ratings.ratings[i]);
    }
    avgRating /= totalRatings;
  }

  const clearFilters = () => {
    removeFilter(-1);
  }

  return (
    <div>
      <Stack direction="row">
        <h1 style={{fontWeight: 'bolder'}}>{avgRating.toFixed(1)}</h1>
        <Rating name="read-only" value={avgRating} precision={0.25} readOnly />
      </Stack>
      ({totalRatings} reviews)
      <br/>Rating Breakdown:<br/>

      {ratings.ratings && Object.values(ratings.ratings).reverse().map((rating, i) => (
        <RatingEntry key={i} i={5-i} rating={rating} totalRatings={totalRatings} addFilter={addFilter} removeFilter={removeFilter} filter={filter}/>
      ))}
            {filter.length > 0 ? (<u style={{cursor: 'pointer'}} onClick={clearFilters}>Clear filters</u>) : <div><br/></div>}
      <div>{recommendedPercent}% of reviewers recommend this product.</div>
    </div>
  )
}

export default RatingBreakdown;