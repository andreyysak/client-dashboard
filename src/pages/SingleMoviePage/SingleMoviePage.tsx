import { useParams } from 'react-router-dom'
import { useMovies } from '@/entities/movies/api/movieQuery.ts'
import Loader from '@/widgets/Loader'
import { Star, Clock, Calendar } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Breadcrumbs from '@/widgets/Breadcrumbs'

const formatRuntime = (minutes: number) => {
  if (!minutes) return '-'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

const getImportantCrew = (crew: any[]) => {
  if (!crew) return []
  const importantJobs = ['Director', 'Screenplay', 'Writer', 'Story']
  return crew.filter((member) => importantJobs.includes(member.job)).slice(0, 4)
}

export const SingleMoviePage = () => {
  const { id } = useParams()
  const { movieDetails } = useMovies(Number(id))

  const movie = movieDetails.data

  if (movieDetails.isLoading) {
    return <Loader />
  }

  if (!movieDetails.data && !movie) {
    return null
  }

  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : ''
  const importantCrew = getImportantCrew(movie?.credits?.crew || [])
  const topCast = movie?.credits?.cast?.slice(0, 15) || []

  return (
    <div className="movie">
      <Breadcrumbs />
      
      <section className="movie__hero">
        <div className="movie__background">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.original_title}
          />
        </div>

        <div className="movie__content">
          <div className="movie__poster">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt={movie?.original_title}
            />
          </div>

          <div className="movie__info">
            <h1 className="movie__title">
              {movie?.title}{' '}
              {releaseYear && <span className="movie__year">({releaseYear})</span>}
            </h1>

            <div className="movie__facts">
              <span className="movie__fact-item">
                <Calendar size={16} />
                {movie?.release_date}
              </span>
              <span className="movie__fact-separator">•</span>
              <span className="movie__fact-item">
                {movie?.genres?.map((g) => g.name).join(', ')}
              </span>
              <span className="movie__fact-separator">•</span>
              <span className="movie__fact-item">
                <Clock size={16} />
                {formatRuntime(movie?.runtime || 0)}
              </span>
            </div>

            <div className="movie__actions">
              <div className="movie__score">
                <Star size={24} fill="currentColor" />
                <div className="movie__score-text">
                  <span>{movie?.vote_average?.toFixed(1)}</span>
                  <small>User Score</small>
                </div>
              </div>
            </div>

            {movie?.tagline && <p className="movie__tagline">{movie.tagline}</p>}

            <div className="movie__overview">
              <h3>Overview</h3>
              <p>{movie?.overview}</p>
            </div>

            {importantCrew.length > 0 && (
              <div className="movie__crew">
                {importantCrew.map((person, index) => (
                  <div
                    key={`${person.credit_id}-${index}`}
                    className="movie__crew-member"
                  >
                    <strong>{person.name}</strong>
                    <span>{person.job}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="movie__main">
        <div className="movie__cast">
          <h3>Top Billed Cast</h3>
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            className="movie__cast-swiper"
            breakpoints={{
              320: { spaceBetween: 12 },
              768: { spaceBetween: 16 },
            }}
          >
            {topCast.map((actor) => (
              <SwiperSlide key={actor.id} className="movie__cast-slide">
                <div className="movie__cast-card">
                  <div className="movie__cast-image">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w276_and_h350_face/${actor.profile_path}`}
                        alt={actor.name}
                      />
                    ) : (
                      <div className="movie__cast-placeholder" />
                    )}
                  </div>
                  <div className="movie__cast-info">
                    <strong>{actor.name}</strong>
                    <span>{actor.character}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  )
}
