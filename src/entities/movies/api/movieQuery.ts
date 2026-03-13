import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MovieTrending } from '@/entities/movies/model/MovieTrending.ts'
import { ApiError } from '@/shared/types/ApiError.ts'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/shared/api/axios.ts'
import { MovieApi } from '@/entities/movies/api/movieApi.ts'
import { MoviePopular } from '@/entities/movies/model/MoviePopular.ts'
import { MovieUpcoming } from '@/entities/movies/model/MovieUpcoming.ts'
import { MovieSearch } from '@/entities/movies/model/MovieSearch.ts'
import { MovieSearchById } from '@/entities/movies/model/MovieSearchById.ts'
import { MovieCastMember } from '@/entities/movies/model/MovieCastMember.ts'

export const useMovies = (movieId?: number, searchQuery?: string) => {
  const queryClient = useQueryClient()

  const moviesTrending = useQuery<MovieTrending[], ApiError>({
    queryKey: ['movie-trending'],
    queryFn: () => MovieApi.getTrendingMovies(),
    placeholderData: (previousData) => previousData,
  })

  const moviesPopular = useQuery<MoviePopular[], ApiError>({
    queryKey: ['movie-popular'],
    queryFn: () => MovieApi.getPopularMovies(),
    placeholderData: (previousData) => previousData,
  })

  const moviesUpcoming = useQuery<MovieUpcoming[], ApiError>({
    queryKey: ['movie-upcoming'],
    queryFn: () => MovieApi.getUpcomingMovies(),
    placeholderData: (previousData) => previousData,
  })

  const moviesByTitle = useQuery<MovieSearch[], ApiError>({
    queryKey: ['movies-search', searchQuery],
    queryFn: () => MovieApi.getMoviesByTitleFromTMDB(searchQuery || ''),
    enabled: !!searchQuery,
    placeholderData: (previousData) => previousData,
  })

  const movieDetails = useQuery<MovieSearchById, ApiError>({
    queryKey: ['movie-details', movieId],
    queryFn: () => MovieApi.getMovieByIdFromTMDB(movieId!),
    enabled: !!movieId,
  })

  const movieCredits = useQuery<MovieCastMember[], ApiError>({
    queryKey: ['movie-credits', movieId],
    queryFn: () => MovieApi.getMovieCastMember(movieId!),
    enabled: !!movieId,
  })

  const favoriteMutation = useMutation({
    mutationFn: (id: number) => MovieApi.toggleFavoriteMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie-favorite'] })
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })

  const watchedMutation = useMutation({
    mutationFn: (id: number) => MovieApi.toggleWatchedMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie-watched'] })
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })

  const watchLaterMutation = useMutation({
    mutationFn: (id: number) => MovieApi.toggleWatchLaterMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie-watch-later'] })
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })

  return {
    moviesTrending,
    moviesPopular,
    moviesUpcoming,
    moviesByTitle,
    movieDetails,
    movieCredits,
    toggleFavorite: favoriteMutation.mutate,
    toggleWatched: watchedMutation.mutate,
    toggleWatchLater: watchLaterMutation.mutate,
    isMutating:
      favoriteMutation.isPending ||
      watchedMutation.isPending ||
      watchLaterMutation.isPending,
  }
}
