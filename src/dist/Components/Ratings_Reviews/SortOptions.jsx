import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


let SortOptions = ({sortBy, changeSortOrder, updateSearch}) => {

  const [searchWord, setSearchWord] = useState('');

  const handleChange = (e) => {
    changeSortOrder(e.target.value);
  };

  const updateSearchWord = (e) => {
    setSearchWord(e.target.value);
  }

  const handleClick = () => {
    updateSearch(searchWord);
  }

  return (
    <Stack direction="row" spacing={1} sx={{p:'4'}}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          value={sortBy}
          label="Sort by"
          onChange={handleChange}
          displayEmpty
          labelId="sort-label"
        >
          <MenuItem value="relevant">Relevant</MenuItem>
          <MenuItem value="helpful">Helpful</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" sx={{p: 1}} spacing={2}>
        <TextField id="search-bar" label="Search" variant="outlined" type="search" size="small" value={searchWord} onChange={updateSearchWord}/>
        <Button variant="contained" onClick={handleClick}>Search</Button>
      </Stack>
    </Stack>
  )
}

export default SortOptions;