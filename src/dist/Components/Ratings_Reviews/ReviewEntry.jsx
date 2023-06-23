import React from 'react';

let ReviewEntry = ({review}) => {


  console.log(review);

  return (
    <div style={{border: "solid black"}}>
      <div>{review.body}</div>
    </div>
  )
}

export default ReviewEntry;