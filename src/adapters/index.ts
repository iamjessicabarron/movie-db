import MovieObject from '../interfaces/MovieObject'

interface Adapter<T> {
  adapt(item: any): T;
}
export class MovieAdapter implements Adapter<MovieObject> {
  adapt(item: any): MovieObject {
    let baseImageUrl = process.env.REACT_APP_API_IMAGE_URL

    let obj: MovieObject = {
      id: item.id,
      title: item.title,
      rating: item.vote_average,
      date: new Date(item.release_date),
      posterUrl: item.poster_path !== null ? `${baseImageUrl}${item.poster_path}` : null,
      coverUrl: item.backdrop_path !== null ? `${baseImageUrl}${item.backdrop_path}`: null,
      overview: item.overview,
    }
    return obj
  }
}

export default { MovieAdapter }