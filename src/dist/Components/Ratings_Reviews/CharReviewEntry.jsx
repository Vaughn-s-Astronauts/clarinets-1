import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



let CharReviewEntry = ({char, updateCharObj, charID}) => {
  const [currentSelected, setCurrentSelected] = useState('none selected');

  let descObj = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5'
  }



  if (char === 'Size') {
    descObj[1] = 'A size too small';
    descObj[2] = '½ a size too small';
    descObj[3] = 'Perfect';
    descObj[4] = '½ a size too big';
    descObj[5] = 'A size too wide';
  } else if (char === 'Quality') {
    descObj[1] = 'Poor';
    descObj[2] = 'Below average';
    descObj[3] = 'What I expected';
    descObj[4] = 'Pretty great';
    descObj[5] = 'Perfect';
  } else if (char === 'Width') {
    descObj[1] = 'Too narrow';
    descObj[2] = 'Slightly narrow';
    descObj[3] = 'Perfect';
    descObj[4] = 'Slightly wide';
    descObj[5] = 'Too wide';
  } else if (char === 'Comfort') {
    descObj[1] = 'Uncomfortable';
    descObj[2] = 'Slightly uncomfortable';
    descObj[3] = 'Ok';
    descObj[4] = 'Comfortable';
    descObj[5] = 'Perfect';
  } else if (char === 'Length') {
    descObj[1] = 'Runs short';
    descObj[2] = 'Runs slightly short';
    descObj[3] = 'Perfect';
    descObj[4] = 'Runs slightly long';
    descObj[5] = 'Runs long';
  } else if (char === 'Fit') {
    descObj[1] = 'Runs tight';
    descObj[2] = 'Runs slightly tight';
    descObj[3] = 'Perfect';
    descObj[4] = 'Runs slightly long';
    descObj[5] = 'Runs long';
  } else {
    descObj[1] = 'error 1';
    descObj[2] = 'error2';
    descObj[3] = 'error3';
    descObj[4] = 'error4';
    descObj[5] = 'error5';
  }

  const handleChange = (e) => {
    setCurrentSelected(descObj[e.target.value]);
    updateCharObj(e);
  }

  return (
    <div>
      <hr/>
      <FormControl>
        <FormLabel id={`${char}-label`}>{char}*</FormLabel>
        <div style={{textAlign: 'center'}}>{currentSelected}</div>
        <RadioGroup
        row
        aria-labelledby={`${char}-label`}
        name={`${charID}`}
        onChange={handleChange}
        >
          <FormControlLabel value="1" control={<Radio />} label={descObj[1]} labelPlacement="bottom" />
          <FormControlLabel value="2" control={<Radio />} labelPlacement="bottom" />
          <FormControlLabel value="3" control={<Radio />} labelPlacement="bottom" />
          <FormControlLabel value="4" control={<Radio />} labelPlacement="bottom" />
          <FormControlLabel value="5" control={<Radio />} label={descObj[5]} labelPlacement="bottom" />
        </RadioGroup>
      </FormControl>
      <br/>
    </div>
  )
}

export default CharReviewEntry;