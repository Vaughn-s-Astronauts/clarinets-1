import React, {useState} from 'react';
import CharReviewEntry from './CharReviewEntry.jsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let AddReview = ({productName, chars}) => {

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState('');
  const [charObj, setCharObj] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    let value = e.target.value;
    setCharObj({...charObj,
      [e.target.name]: value
    });

    console.log(charObj);
    console.log(Object.keys(chars));
  }




  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>ADD A REVIEW</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Write Your Review
          </Typography>
          <Typography id="modal-modal-description" sx={{mb:2}}>
            About the {productName}
          </Typography>
          Rating* <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
          setRating(newValue);
        }}/>
        {rating === 1 ? '"Poor"' : rating === 2 ? '"Fair"' : rating === 3 ? '"Average"' : rating === 4 ? '"Good"' : rating === 5 ? '"Great"' : ""}
        <br/><br/>
        <FormControl>
          <FormLabel id="recommend-label">Do you recommend this product?*</FormLabel>
          <RadioGroup
          row
          aria-labelledby="recommend-label"
          name="recommended"
          onChange={handleChange}
          >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
          {chars && Object.keys(chars).map((char, i) => (<CharReviewEntry key={i} char={char} />))}
        </Box>
      </Modal>

    </div>
  )
}

export default AddReview;