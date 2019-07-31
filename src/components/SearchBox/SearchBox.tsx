import React from 'react';
import './SearchBox.css';

import Movie from '../Movie/Movie'

const SearchBox: React.FC = () => {
  return(
    <div className="searchBox">
      <input type="text" placeholder="Search"></input>
    </div>
  )

}

export default SearchBox;