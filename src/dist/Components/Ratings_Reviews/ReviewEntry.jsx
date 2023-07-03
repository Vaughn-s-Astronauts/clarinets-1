import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import API from '../../helpers/API.js';

let ReviewEntry = ({review}) => {

  const [fullReviewShown, setFullReviewShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const [helpful, setHelpful] = useState(review.helpfulness);

  const date = new Date(review.date);

  //console.log(review);

  const showFullReview = () => {
    setFullReviewShown(true);
  }

  const openModal = (e) => {
    setCurrentImg(e.target.src);
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
    setCurrentImg('');
  }

  const addHelpful = () => {
    if (!clickedHelpful) {
      API.PUT_REVIEW_HELPFUL(review.review_id);
      setHelpful(helpful+1);
    }
    setClickedHelpful(true);
  }

  return (
    <Box sx={reviewStyle}>
      <Rating name="read-only" value={review.rating} precision={0.25} readOnly />
      <div>Posted on {date.toDateString().slice(4)}</div>
      <div><b>{review.summary.slice(0, 60)}</b></div>

      {(review.body.length <= 250 || fullReviewShown) && <div>{review.body}</div>}

      {(review.body.length > 250 && !fullReviewShown) && 
      <div>
        <div>{review.body.slice(0, 250)}</div>
        <Button onClick={showFullReview}>Show more</Button>
      </div>}
      {review.photos.map((photo, i) => {
        return <span key={i}>
          <img src={photo.url} width="64" onClick={openModal} style={{cursor: "pointer"}}></img>
          </span>
      })}
      {review.recommend && <div>I recommend this product&#9745;</div>}
      <div>{review.reviewer_name}</div>
      {review.response !== null &&
      <div style={{color: 'blue'}}>
        <div><b>Response from seller</b></div>
        <div>{review.response}</div>
      </div>}

      <div>Was this review helpful?  
        <span onClick={addHelpful}> <u style={{cursor: "pointer"}}>Yes</u> </span>({helpful})
      </div>
      <hr/>

      <Modal open={open} onClose={closeModal}>
        <Box sx={modalStyle}>
          <img src={currentImg} height="100%"></img>
        </Box>
      </Modal>

    </Box>
  )
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '90vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const reviewStyle = {
  marginBottom: "8px",
  padding: "4px",
}

export default ReviewEntry;