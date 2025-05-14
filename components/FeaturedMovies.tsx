import React from 'react'
import MovieCard from './MovieCard'
import { fetchMovies } from '@/app/api/movies/route';
import { Movie } from '@/type/movie';

const FeaturedMovies = async () => {
     const movies: Movie[] = await fetchMovies();
      const featuredMovies = movies.filter((movie) => movie.isFeatured === true);
  return (
    <section className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 border-b border-gray-700 pb-2">
          🔥 Featured Movies 🔥
        </h2>

        {featuredMovies.length === 0 ? (
          <p className="text-gray-400">No featured movies available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                name={movie.name}
                releaseDate={movie.releaseDate}
                mainCharacter={movie.mainCharacter}
              />
            ))}
          </div>
        )}
      </section>
  )
}

export default FeaturedMovies