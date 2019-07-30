import React from 'react';
import './MovieList.css';

import Movie from '../Movie/Movie'

const MovieList: React.FC = () => {
  return(
    <div className="movieList">
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
    </div>
  )

}

export default MovieList;