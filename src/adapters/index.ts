import MediaObject from '../interfaces/MovieObject'
import { MediaType } from '../interfaces/MediaType'

interface Adapter<T> {
  adapt(item: any): T;
}
export class MediaAdapter implements Adapter<MediaObject> {
  type: MediaType

  constructor(type: MediaType) {
    this.type = type
  }
  adapt(item: any): MediaObject {
    let baseImageUrl = process.env.REACT_APP_API_IMAGE_URL

    let dateString = ""
    let titleString = ""

    switch(this.type) {
      case MediaType.Movie:
        dateString = item.release_date
        titleString = item.title
        break;

      case MediaType.TV:
        dateString = item.first_air_date
        titleString = item.original_name
        break;
    }

    let newDate =  new Date(dateString)
    let isValidDate = newDate.toString() !== "Invalid Date"

    let obj: MediaObject = {
      type: this.type,
      id: item.id,
      title: titleString,
      rating: item.vote_average,
      date: isValidDate ? newDate : null,
      posterUrl: item.poster_path !== null ? `${baseImageUrl}${item.poster_path}` : null,
      coverUrl: item.backdrop_path !== null ? `${baseImageUrl}${item.backdrop_path}`: null,
      overview: item.overview,
    }
    return obj
  }
}

export default { MediaAdapter }