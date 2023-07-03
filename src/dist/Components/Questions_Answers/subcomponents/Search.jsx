import React, {useState, useEffect} from 'react';

let Search = ({search}) => {
    const [searchChars, setSearchChars] = useState('');

    const updateSearch = (e) => {
      console.log('search chars', searchChars);
      setSearchChars(e.target.value);
      if (searchChars.length > 2) {
          search(searchChars);
      }
    }

    return (
        <div>
            <input
                onChange={updateSearch}
                placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            >
            </input>
        </div>
    )

};

export default Search;