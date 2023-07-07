import React, { useState, useEffect } from 'react';
import API from '../../helpers/API.js';
import Stack from 'react-bootstrap/Stack';
import Rating from '@mui/material/Rating';


export default function ProductRating ({product}) {

  const [currentReviews, setCurrentReviews] = useState([])
  const [currentAvgReview, setCurrentAvgReview] = useState(0)

  useEffect(() => {
    API.GET_REVIEWS(product.id, 1, 1000)
      .then((response) => {
        let reviewCount = response.data.results.length || 0;
        let startCount = 0;
        response.data.results.map(({rating}) => {
          startCount += rating;
        })
        setCurrentReviews(response.data.results);
        setCurrentAvgReview(startCount/reviewCount)
    })
  }, [product])

  return(
    <Stack direction='horizontal' gap={1}>
      <Rating name="half-rating-read" value={(currentAvgReview)} precision={0.25} readOnly/>
      {currentReviews.length > 0 && <a href="#jumpToRatings">Read all {currentReviews.length} reviews</a>}
    </Stack>
  )
}