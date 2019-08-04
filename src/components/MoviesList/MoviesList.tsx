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
  return(
    <div className={`moviesList ${props.className}`}>
      {list}
    </div>
  )

}

export default MoviesList;