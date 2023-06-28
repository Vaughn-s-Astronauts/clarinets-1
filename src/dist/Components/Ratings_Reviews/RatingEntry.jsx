import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import API from '../../helpers/API.js';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


let RatingEntry = ({i, rating, totalRatings, filterReviews}) => {

  const [hovering, setHovering] = useState(false);



  const style = {
    fontWeight: hovering ? 'bold' : 'normal'
  };

  const handleClick = (e) => {
    filterReviews(i);
  }
  



  return (
    <div style={{display: 'flex', width: '20%', backgroundColor: hovering ? 'silver' : 'white'}} onClick={handleClick} onMouseLeave={() => setHovering(false)} onMouseEnter={() => setHovering(true)}>{i} stars: <LinearProgress variant="determinate" value={rating/totalRatings*100} sx={{width:'30%'}} />
      ({rating})
    </div>
  )
}

export default RatingEntry;