import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import arrow from './arrow.svg';
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

      getFromApi(`/movie/${movie.id}`, null)
        .then((data) => {
          setRuntime(data.runtime)
        })
        .catch(error => {
          console.log("There was an getting movie runtime")
        })
    } 
  }, [props.movie])


  if (movie === null) {
    return <div className="movieDetails"></div>
  }

  let runtimeValue = <span>&middot;&middot;&middot;</span>;

  if (runtime != null) {
    let hours = Math.floor(runtime / 60)
    let leftoverMinutes = runtime % 60

    runtimeValue = <span>{`${hours}h ${leftoverMinutes} min`}</span>
  }

  const posterImg = () => {
    if (movie !== null && movie.posterUrl !== null) {
      return <img src={movie.posterUrl} alt=""></img>
    }
    return null
  }

  const coverImg = () => {
    if (movie !== null && movie.coverUrl !== null) {
      return <img src={movie.coverUrl} alt=""></img>
    }
    return null
  }

  return(
    <div className={`movieDetails ${movieSelected}`}>
      <div className="cover">{coverImg()}</div>
      <div className="container">
        <div className="backButton" onClick={props.onBackClick}><img src={arrow} alt="Return to all movies"></img></div>
        <div className="header">
        <div className="poster">{posterImg()}</div>
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