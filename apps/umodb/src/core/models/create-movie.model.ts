export interface CreateMovieModel {
  title: string
  authorName: string
  addedBy: { externalId: string }
  addToPlataform: { externalId: string }
  movieCast: { externalId: string }[]
}
