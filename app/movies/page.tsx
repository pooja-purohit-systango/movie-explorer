'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../api/movies/route'
import MoviesList from '@/components/MoviesList'
import { Movie } from '@/type/movie'

const MoviesPage = () => {
  const { data: movies, isLoading, isError, error } = useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  })

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen text-white bg-gray-950">
      <p className="text-lg">🎞️ Loading movies...</p>
    </div>
  )

  if (isError) return (
    <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-950">
      <p className="text-lg">❌ Error: {error instanceof Error ? error.message : 'An error occurred'}</p>
    </div>
  )

  if (!movies || movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400 bg-gray-950">
        <p className="text-lg">No movies available 📭</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 sm:px-10">
      <h1 className="text-4xl font-bold mb-10 text-center">🎬 All Movies</h1>

      <MoviesList movies={movies} />
    </div>
  )
}

export default MoviesPage
