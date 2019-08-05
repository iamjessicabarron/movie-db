import React from 'react';
import './SearchBox.css';
import searchIcon from './search.svg'

type Props = {
  onSearch: (str: string) => void
  value: string,
  className: string
}

const SearchBox: React.FC<Props> = (props) => {
  return(
    <div className={`searchBox ${props.className}`}>
      <input type="text" placeholder="Search" onChange={(event) => props.onSearch(event.target.value)} value={props.value}></input>
      <img src={searchIcon} alt=""></img>
    </div>
  )

}

export default SearchBox;