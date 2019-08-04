import React from 'react';
import './Movie.css';

import MovieObject from '../../interfaces/MovieObject'

type Props = {
  data: MovieObject,
  onClick: (movie: MovieObject) => void
}
const Movie: React.FC<Props> = (props) => {

  let movie = props.data
  let month = movie.date.toLocaleString('default', { month: 'long' });
  let ratingCategory = () => {
    let rating = movie.rating / 10
    if (rating < 1/4) {
      return 'ratedPoorly'
    } else if (rating > (1/4*3)) {
      return 'ratedWell'
    }

    return ""
  }

  const posterImg = () => {
    if (movie.posterUrl !== null) {
      return <img src={movie.posterUrl} alt=""></img>
    }
    return null
  }

  return(
    <div className="movie" onClick={ props.onClick.bind(null, movie) }>
      <div className={`rating ${ratingCategory()}`}>{`${movie.rating * 10}%`}</div>
      <div className="poster">{posterImg()}</div>
      <div className="title">{movie.title}</div>
      <div className="date">{`${month} ${movie.date.getFullYear()}`}</div>
    </div>
  )
}

export default Movie;