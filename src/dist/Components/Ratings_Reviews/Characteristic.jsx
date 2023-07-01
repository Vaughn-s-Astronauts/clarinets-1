import React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

let lowest = 'bad';
let highest = 'good';



let Characteristic = ({char, score}) => {

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

  let marks = [
    {
      value: 0,
      label: lowest,
    },
    {
      value: 25
    },
    {
      value: 50
    },
    {
      value: 75
    },
    {
      value: 100,
      label: highest,
    },
  ];

  return (
    <div>
      <Stack alignItems="center">
      <Typography id="input-slider" gutterBottom>{char}</Typography>
      <Slider sx={{width: 125, mb: 4}} disabled defaultValue={score*20} aria-label="Disabled slider" align="center" step={25} marks={marks} track={false}/>
      </Stack>
    </div>
  )
}

export default Characteristic;