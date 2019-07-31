import React from 'react';
import './MoviesList.css';

import Movie from '../Movie/Movie'

const MoviesList: React.FC = () => {
  return(
    <div className="moviesList">
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
      <Movie></Movie>
    </div>
  )

}

export default MoviesList;