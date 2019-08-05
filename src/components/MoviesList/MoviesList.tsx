import React from 'react';
import './MoviesList.css';

import Movie from '../Movie/Movie'
import MovieObject from '../../interfaces/MovieObject'

type Props = {
  data: MovieObject[],
  onClick: (movie: MovieObject) => void,
  className: string
}

const MoviesList: React.FC<Props> = (props) => {
  let list = props.data.map(item => {
    return(<Movie key={item.id} onClick={props.onClick} data={item}></Movie>)
  })

  const listAlt = () => {
      return (
      <div className="searchFailure">
        <h2>Oh no!</h2>
        <h3>We can't find anything! Try changing your search terms.</h3>
      </div>)
  }

  return(
    <div className={`moviesList ${props.className}`}>
      {props.data.length > 0 ? list : listAlt()}
    </div>
  )

}

export default MoviesList;