import React, {useState, useEffect} from 'react';
import git_api from '../../../../config.js';
import ReviewsList from './ReviewsList.jsx';
import SortOptions from './SortOptions.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import AddReview from './AddReview.jsx';
import API from '../../helpers/API.js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


let RatingsReviews = ({product}) => {
  const [allReviews, setAllReviews] = useState([]);
  const [shownReviews, setShownReviews] = useState([]);
  const [reviewAmount, setReviewAmount] = useState(2);
  const [sortBy, setSortBy] = useState('relevant');
  const [ratings, setRatings] = useState({});
  const [filter, setFilter] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  let totalRatings = 0;

  if (ratings.ratings) {
    for (let i in ratings.ratings) {
      totalRatings += parseInt(ratings.ratings[i]);
    }
  }

  const getReviews = () => {
    API.GET_REVIEWS(product.id, 1, 1000, sortBy).then((response) => {
      let reviews = response.data.results || [];
      if (filter.length > 0) {
        reviews = reviews.filter(review => filter.includes(review.rating));
      }
      if (searchWord.length > 0) {
        let lowerSearchWord = searchWord.replaceAll(' ', '').toLowerCase();
        reviews = reviews.filter(review =>
          (review.body.replaceAll(' ', '').toLowerCase().includes(lowerSearchWord) || review.summary.replaceAll(' ', '').toLowerCase().includes(lowerSearchWord)));
      }
      setAllReviews(reviews);
      setShownReviews(reviews.slice(0, reviewAmount));
    }).catch((error) => {
      console.log(error);
    });
  }

  const getRatings = () => {
    API.GET_REVIEWS_META(product.id).then((response) => {
      setRatings(response.data || {});
    }).catch((error) => {
      console.log(error);
    })
  }

  const showMoreReviews = () => {
    setReviewAmount(reviewAmount+2);
  }

  const changeSortOrder = (value) => {
    setSortBy(value);
  }

  const addFilter = (star) => {
    if (!filter.includes(star)) {
      setFilter(filter => [...filter, star]);
    }
  }

  const removeFilter = (star) => {
    if (star === -1) {
      setFilter([]);
    } else if (filter.includes(star)) {
      let array = [...filter];
      let index = array.indexOf(star)
      if (index !== -1) {
        array.splice(index, 1);
        setFilter(array);
      }
    }
  }

  const updateSearch = (word) => {
    setSearchWord(word);
  }

  useEffect(() => {
    getRatings();
  }, [product]);

  useEffect(() => {
    getReviews();
  }, [sortBy, filter, product, searchWord]);

  useEffect(() => {
    setShownReviews(allReviews.slice(0, reviewAmount));
  }, [reviewAmount, allReviews]);

  return (
    <div id='jumpToRatings'style={{marginTop: '20px'}}>
      <Stack direction="row" spacing={2}>
        <div>
      <Stack spacing={2} alignItems="stretch">
      {ratings ? <RatingBreakdown ratings={ratings} addFilter={addFilter} removeFilter={removeFilter} filter={filter}/>
      : <div></div>}
      <ProductBreakdown chars={ratings.characteristics}/>
      </Stack>

        </div>
        <div style={{width: "100%"}}>
      <div style={{display:'flex'}}><h3>Reviews for {product.name}</h3> <span style={{marginTop: '6px'}}>&ensp;({totalRatings} reviews)</span></div>
      <SortOptions sortBy={sortBy} changeSortOrder={changeSortOrder} updateSearch={updateSearch}/>
      <ReviewsList shownReviews={shownReviews}/>

      <Stack direction="row" spacing={2} sx={{p:2}}>
      {(allReviews && reviewAmount < allReviews.length && allReviews.length > 2) ?
      <Button variant="outlined" onClick={showMoreReviews}>MORE REVIEWS</Button>
      : <div> All reviews displayed </div>}
      <AddReview productID={product.id} productName={product.name} chars={ratings.characteristics}/>
      </Stack>
      </div>
      </Stack>
    </div>);
};

export default RatingsReviews;