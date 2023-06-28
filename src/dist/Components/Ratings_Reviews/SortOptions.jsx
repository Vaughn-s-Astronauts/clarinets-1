import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../../helpers/API.js';

let SortOptions = ({sortBy, changeSortOrder}) => {


  const handleChange = (event) => {
    changeSortOrder(event.target.value);
  };

  return (
    <div>
      Sort by: 
      <select onChange={handleChange}>
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  )
}

export default SortOptions;