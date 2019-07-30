import React from 'react';
import './Movie.css';

const Movie: React.FC = () => {
  return(
    <div className="movie">
      <div className="rating">83%</div>
      <div className="poster"><img></img></div>
      <div className="title">Avenger's Infinity War</div>
      <div className="date">April 2018</div>
    </div>
  )
}

export default Movie;