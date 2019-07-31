import React from 'react';
import './MoviesList.css';

import Movie from '../Movie/Movie'
import MovieObject from '../../interfaces/MovieObject'

type Props = {
  data: MovieObject[]
}

const MoviesList: React.FC<Props> = (props) => {

  let list = props.data.map(item => {
    return(<Movie data={item}></Movie>)
  })
  return(
    <div className="moviesList">
      {list}
    </div>
  )

}

export default MoviesList;