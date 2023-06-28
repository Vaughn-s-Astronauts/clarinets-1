import React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

let Characteristic = ({char, score}) => {
  let lowest = 'bad';
  let highest = 'good';

  if (char === 'Quality') {
    lowest = 'Low';
    highest = 'High';
  } else if (char === 'Size') {
    lowest = 'Too small';
    highest = 'Too big';
  } else if (char === 'Width') {
    lowest = 'Too skinny';
    highest = 'Too wide';
  } else if (char === 'Comfort') {
    lowest = 'Poor';
    highest = 'Perfect';
  } else if (char === 'Length') {
    lowest = 'Too short';
    highest = 'Too long';
  } else if (char === 'Fit') {
    lowest = 'Too tight';
    highest = 'Too loose';
  }

  return (
    <div style={{width: 150}}>
      <div style={{textAlign: 'center'}}>{char}</div>
      <Stack alignItems="center">
      <Slider sx={{width: 125}} disabled defaultValue={score*20} aria-label="Disabled slider" align="center"/>
      </Stack>
      <div>
      <span style={{float:'left'}}>{lowest}</span>
      <span style={{float:'right'}}>{highest}</span>
      <br/>
      </div>
    </div>
  )
}

export default Characteristic;