import React, {useState} from 'react';

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