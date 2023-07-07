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
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddPhoto from './AddPhoto.jsx';
import API from '../../helpers/API.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '90vh',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll'
};

let AddReview = ({productID, productName, chars}) => {

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState('blank');
  const [charObj, setCharObj] = useState({});
  const [summary, setSummary] = useState('');
  const [minText, setMinText] = useState('Minimum required characters left: 50');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateRecommend = (e) => {
    {e.target.value === 'yes' ? setRecommend(true) :
    setRecommend(false)}
  }

  const updateCharObj = (e) => {
    let value = e.target.value;
    setCharObj({...charObj,
      [e.target.name.toString()]: parseInt(value)
    });
  }

  const updateSummary = (e) => {
    if (summary.length < 60) {
      setSummary(e.target.value);
    }
  }

  const updateNickname = (e) => {
    if (nickname.length < 60) {
      setNickname(e.target.value);
    }
  }

  const updateEmail = (e) => {
    if (email.length < 60) {
      setEmail(e.target.value);
    }
  }

  const updateBody = (e) => {
    let currentBody = e.target.value;
    if (body.length < 1000) {
      setBody(currentBody);
      if (currentBody.length < 50) {
        setMinText(`Minimum required characters left: ${50 - currentBody.length}`);
      } else {
        setMinText("Minimum reached");
      }
    }
  }

  const addPhotoURL = (url) => {
    setPhotos([...photos, url]);
  }

  const checker = () => {
    if (rating === 0) {
      alert('Please select a rating.');
    } else if (recommend === 'blank') {
      alert('Please select a recommendation.');
    } else if (!Object.keys(chars).every(char => Object.keys(charObj).includes(chars[char].id.toString()))) {
      alert('Please select a rating for all characteristics.');
    } else if (body.length < 50) {
      alert('Review body too short.');
    } else if(!nickname) {
      alert('Please enter a name.');
    } else if(!email) {
      alert('Please enter an email.');
    } else {
      submit();
    }
  }

  const submit = () => {
    let reviewBody = {
      product_id: parseInt(productID),
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: nickname,
      email: email,
      photos: photos,
      characteristics: charObj
    }

    console.log('sending... ', reviewBody);
    API.POST_REVIEWS(reviewBody)
    .then((response) => {
      console.log('review submitted', response);
    }).catch((error) => {
      console.log(error);
    })
    setOpen(false);
    //alert('Review submitted.');
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>ADD A REVIEW</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{overflow: 'scroll'}}
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
        <Stack spacing={2}>
        <FormControl>
          <FormLabel id="recommend-label">Do you recommend this product?*</FormLabel>
          <RadioGroup
          row
          aria-labelledby="recommend-label"
          name="recommended"
          onChange={updateRecommend}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        {chars && Object.keys(chars).map((char, i) => (<CharReviewEntry key={i} char={char} updateCharObj={updateCharObj} charID={chars[char].id}/>))}
        <TextField
          id="review-summary"
          label="Review Summary"
          multiline
          fullWidth
          rows={3}
          placeholder="Example: Best purchase ever!"
          onChange={updateSummary}
        /><br/>
        <TextField
          id="review-body"
          label="Review Body"
          multiline
          fullWidth
          rows={6}
          placeholder="Why did you like the product or not?"
          value={body}
          onChange={updateBody}
        />
        {minText}
        <Stack direction="row" spacing={2}>
        {photos.map((photo, i) => (<span key={i}>
          <img src={photo} width="64" ></img>
        </span>))}
        </Stack>
        <AddPhoto photos={photos} addPhotoURL={addPhotoURL}/>
        <TextField
          id="review-nickname"
          label="Name*"
          fullWidth
          placeholder="Example: jackson11!"
          value={nickname}
          onChange={updateNickname}
        />     
        For privacy reasons, do not use your full name or email address   
        <TextField
          id="review-email"
          label="Email*"
          fullWidth
          placeholder="Example: jackson11@email.com"
          value={email}
          onChange={updateEmail}
        />
        For authentication reasons, you will not be emailed

        <Button variant="contained" onClick={checker}>Submit</Button>
        </Stack>
        </Box>
      </Modal>



    </div>
  )
}

export default AddReview;