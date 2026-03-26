import {
  MovieTrending,
  MovieTrendingResponse,
} from '@/entities/movies/model/MovieTrending.ts'
import { api } from '@/shared/api/axios.ts'
import {
  MoviePopular,
  MoviePopularResponse,
} from '@/entities/movies/model/MoviePopular.ts'
import {
  MovieUpcoming,
  MovieUpcomingResponse,
} from '@/entities/movies/model/MovieUpcoming.ts'
import { MovieSearch, MovieSearchResponse } from '@/entities/movies/model/MovieSearch.ts'
import {
  MovieSearchById,
  MovieSearchByIdResponse,
} from '@/entities/movies/model/MovieSearchById.ts'
import {
  MovieCastMember,
  MovieCastMemberResponse,
} from '@/entities/movies/model/MovieCastMember.ts'
import {
  MovieFavorite,
  MovieFavoritesResponse,
} from '@/entities/movies/model/MovieFavorite.ts'
import {
  MovieWatched,
  MovieWatchedResponse,
} from '@/entities/movies/model/MovieWatched.ts'
import {
  MovieWatchLater,
  MovieWatchLaterResponse,
} from '@/entities/movies/model/MovieWatchLater.ts'
import { useAppStore } from '@/app/store/useAppStore.ts'

const language = useAppStore.getState().language

export const MovieApi = {
  async getTrendingMovies(): Promise<MovieTrending[]> {
    const response = await api<MovieTrendingResponse>(`/movies/trending?lang=${language}`)
    return response.data.data
  },
  async getPopularMovies(): Promise<MoviePopular[]> {
    const response = await api<MoviePopularResponse>(`/movies/popular?lang=${language}`)
    return response.data.data
  },
  async getUpcomingMovies(): Promise<MovieUpcoming[]> {
    const response = await api<MovieUpcomingResponse>(`/movies/upcoming?lang=${language}`)
    return response.data.data
  },
  async getMoviesByTitleFromTMDB(query: string): Promise<MovieSearch[]> {
    const response = await api<MovieSearchResponse>(
      `/movies/search?query=${query}?lang=${language}`,
    )
    return response.data.data
  },
  async getMovieByIdFromTMDB(id: number): Promise<MovieSearchById> {
    const response = await api<MovieSearchByIdResponse>(
      `/movies/tmdb-details/${id}?lang=${language}`,
    )
    return response.data.data
  },
  async getMovieCastMember(id: number): Promise<MovieCastMember[]> {
    const response = await api<MovieCastMemberResponse>(`/movies/tmdb-credits/${id}?lang=${language}`)
    return response.data.data
  },
  async getFavoritesMovies(): Promise<MovieFavorite[]> {
    const response = await api<MovieFavoritesResponse>('/movies/favorites')
    return response.data.data
  },
  async getWatchedMovies(): Promise<MovieWatched[]> {
    const response = await api<MovieWatchedResponse>('/movies/watched')
    return response.data.data
  },
  async getWatchLaterMovies(): Promise<MovieWatchLater[]> {
    const response = await api<MovieWatchLaterResponse>('/movies/watch-later')
    return response.data.data
  },
  async toggleFavoriteMovie(id: number): Promise<void> {
    await api.post(`/movies/favorite/${id}`)
  },
  async toggleWatchedMovie(id: number): Promise<void> {
    await api.post(`/movies/watched/${id}`)
  },
  async toggleWatchLaterMovie(id: number): Promise<void> {
    await api.post(`/movies/watch-later/${id}`)
  },
}
