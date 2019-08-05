import { MediaType } from './MediaType'

export default interface MovieObject {
  type: MediaType
  id: number,
  title: string,
  rating: number,
  date: Date | null,
  posterUrl: string | null,
  coverUrl: string | null,
  overview: string,
}