import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

let ReviewEntry = ({review}) => {

  const [fullReviewShown, setFullReviewShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const date = new Date(review.date);

  console.log(review.photos);

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


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  return (
    <div style={{border: "solid black"}}>
      <Rating name="read-only" value={review.rating} precision={0.25} readOnly />
      <div>Posted on {date.toDateString().slice(4)}</div>
      <div><b>{review.summary.slice(0, 60)}</b></div>

      {(review.body.length <= 250 || fullReviewShown) && <div>{review.body}</div>}

      {(review.body.length > 250 && !fullReviewShown) && 
      <div>
        <div>{review.body.slice(0, 250)}</div>
        <button onClick={showFullReview}>Show more</button>
      </div>}
      {review.photos.map((photo, i) => {
        return <span key={i}>
          <img src={photo.url} width="64" onClick={openModal}></img>
          </span>
      })}
      <Modal open={open} onClose={closeModal}>
        <Box sx={style}>
          <img src={currentImg} height="650px"></img>
        </Box>
      </Modal>

    </div>
  )
}

export default ReviewEntry;