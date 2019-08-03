import React from 'react';
import './SearchBox.css';

type Props = {
  onSearch: (str: string) => void
}

const SearchBox: React.FC<Props> = (props) => {
  return(
    <div className="searchBox">
      <input type="text" placeholder="Search" onChange={(event) => props.onSearch(event.target.value)}></input>
    </div>
  )

}

export default SearchBox;