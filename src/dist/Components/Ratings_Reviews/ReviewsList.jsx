import React from 'react';
import ReviewEntry from './ReviewEntry.jsx';

let ReviewsList = ({shownReviews}) => {
  //console.log('reviews', shownReviews);

  return (
  <div style={{maxHeight: '50%', overflow: 'auto'}}>
    {shownReviews.map((review, i) => (
      <ReviewEntry key={i} review={review}/>
    ))}
  </div>);
};

export default ReviewsList;