import React from 'react';
import './Movie.css';

import MovieObject from '../../interfaces/MovieObject'

type Props = {
  data: MovieObject
}
const Movie: React.FC<Props> = (props) => {

  let movie = props.data
  let month = movie.date.toLocaleString('default', { month: 'long' });
  let ratingCategory= () => {
    let rating = movie.rating / 10
    console.log(rating)
    if (rating < 1/4) {
      return 'ratedPoorly'
    } else if (rating > (1/4*3)) {
      return 'ratedWell'
    }

    return ""
  }

  return(
    <div className="movie">
      <div className={`rating ${ratingCategory()}`}>{`${movie.rating * 10}%`}</div>
      <div className="poster"><img src={movie.posterUrl}></img></div>
      <div className="title">{movie.title}</div>
      <div className="date">{`${month} ${movie.date.getFullYear()}`}</div>
    </div>
  )
}

export default Movie;