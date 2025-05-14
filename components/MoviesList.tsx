import MovieCard from './MovieCard'
import { Movie } from '@/type/movie'

type MoviesListProps = {
  movies: Movie[]
}

const MoviesList = ({ movies }: MoviesListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          name={movie.name}
          releaseDate={movie.releaseDate}
          mainCharacter={movie.mainCharacter}
        />
      ))}
    </div>
  )
}

export default MoviesList
