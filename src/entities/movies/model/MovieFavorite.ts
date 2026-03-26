export interface MovieFavorite {
  id: number
  user_id: number
  tmdb_id: number
  created_at: string
}

export interface MovieFavoritesResponse {
  success: boolean
  data: MovieFavorite[]
  stausCode: number
  timestamp: string
}