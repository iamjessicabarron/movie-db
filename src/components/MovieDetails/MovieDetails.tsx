import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import MovieObject from '../../interfaces/MovieObject';
import { getFromApi } from '../../helpers';

type Props = {
  movie: MovieObject | null
  onBackClick: () => void
}

const MovieDetails: React.FC<Props> = (props) => {
  let movie = props.movie
  let movieSelected = movie !== null ? "selected" : ""

  let [runtime, setRuntime] = useState<number | null>(null)

  useEffect(() => {
    if (movie != null) {
      setRuntime(null)

      getFromApi(`/movie/${movie.id}`)
        .then((data) => {
          setRuntime(data.runtime)
        })
        .catch(error => {
          console.log("There was an getting movie runtime")
        })
    } 
  }, [props.movie])


  if (movie === null) {
    return <div></div>
  }

  let runtimeValue = <span>&middot;&middot;&middot;</span>;

  if (runtime != null) {
    let hours = Math.floor(runtime / 60)
    let leftoverMinutes = runtime % 60

    runtimeValue = <span>{`${hours}h ${leftoverMinutes} min`}</span>
  }

  return(
    <div className={`movieDetails ${movieSelected}`}>
      <div className="cover"><img src={movie.coverUrl}></img></div>
      <div className="container">
        <div className="backButton" onClick={props.onBackClick}>&#x2190;</div>
        <div className="header">
        <div className="poster"><img src={movie.posterUrl}></img></div>
          <div className="information">
            <h1>{movie.title}</h1>
            <div>
              <h3 className="date">{movie.date.getFullYear()}</h3>
              <h3>&middot;</h3>
              <h3 className="rating">{`${movie.rating * 10}% User Score`}</h3>
            </div>
            <h3 className="length">{runtimeValue}</h3>
          </div>
        </div>
        <hr />

        <h2>Overview</h2>
        <div className="overview">{movie.overview}</div>
      </div>
    </div>

  )
}

export default MovieDetails;