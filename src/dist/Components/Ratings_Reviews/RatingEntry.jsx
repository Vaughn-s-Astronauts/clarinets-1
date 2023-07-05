import React, {useState, useEffect} from 'react';
import LinearProgress from '@mui/material/LinearProgress';


let RatingEntry = ({i, rating, totalRatings, addFilter, removeFilter, filter}) => {

  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const handleClick = (e) => {
    if (!clicked) {
      addFilter(i);
      setClicked(true);
    } else {
      removeFilter(i);
      setClicked(false);
    }
  }

  useEffect(() => {
  }, [filter]);
  
  return (
    <div style={{display: 'flex', backgroundColor: filter.includes(i) || hovering ? 'whitesmoke' : null, cursor: 'pointer', borderRadius: '3px', alignItems: 'center', width: '100%'}} onClick={handleClick} onMouseLeave={() => setHovering(false)} onMouseEnter={() => setHovering(true)}>{i} stars <LinearProgress variant="determinate" value={rating/totalRatings*100} sx={{width:'50%', height: '10', mt: '7', borderRadius: '4px'}} />
      ({rating})
    </div>
  )
}

export default RatingEntry;