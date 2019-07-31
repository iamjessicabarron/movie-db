import React from 'react';
import './MovieDetails.css';

const MovieDetails: React.FC = () => {
  return(
    <div className="movieDetails">
      <div className="cover"><img></img></div>
      <div className="container">
        <div className="backButton">&#x2190;</div>
        <div className="header">
        <div className="poster"><img></img></div>
          <div className="information">
            <h1>Avenger's Infinity War</h1>
            <div>
              <h3 className="date">2018</h3>
              <h3>&middot;</h3>
              <h3 className="rating">82% User Score</h3>
            </div>
            <h3 className="length">2h 15 min</h3>
          </div>
        </div>
        <hr />

        <h2>Overview</h2>
        <div className="overview">Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.</div>
      </div>
    </div>

  )
}

export default MovieDetails;