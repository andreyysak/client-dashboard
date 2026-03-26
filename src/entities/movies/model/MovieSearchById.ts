export interface MovieSearchById {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: null | any
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string | null
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits: {
    cast: {
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string | null
      cast_id: number
      character: string
      credit_id: string
      order: number
    }[]
    crew: {
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string | null
      credit_id: string
      department: string
      job: string
    }[]
  }
  videos: {
    results: any[]
  }
}

export interface MovieSearchByIdResponse {
  statusCode: number
  success: boolean
  data: MovieSearchById
  timestamp: string
}