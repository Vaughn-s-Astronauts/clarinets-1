import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';

let Search = ({search, updateSearch}) => {

    return (
        <TextField id="search-bar"
        fullWidth
        label="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        variant="outlined"
        type="search"
        size="small"
        margin="dense"
        onChange={updateSearch}
        />
    )

};

export default Search;