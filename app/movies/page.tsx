// 'use client'

// import { useQuery } from '@tanstack/react-query'
// import { fetchMovies } from '../api/movies/route'
// import MoviesList from '@/components/MoviesList'
// import { Movie } from '@/type/movie'

// const MoviesPage = () => {
//   const { data: movies, isLoading, isError, error } = useQuery<Movie[], Error>({
//     queryKey: ['movies'],
//     queryFn: fetchMovies,
//   })

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-screen text-white bg-gray-950">
//       <p className="text-lg">🎞️ Loading movies...</p>
//     </div>
//   )

//   if (isError) return (
//     <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-950">
//       <p className="text-lg">❌ Error: {error instanceof Error ? error.message : 'An error occurred'}</p>
//     </div>
//   )

//   if (!movies || movies.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-400 bg-gray-950">
//         <p className="text-lg">No movies available 📭</p>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white px-6 py-10 sm:px-10">
//       <h1 className="text-4xl font-bold mb-10 text-center">🎬 All Movies</h1>

//       <MoviesList movies={movies} />
//     </div>
//   )
// }

// export default MoviesPage
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Movie } from "@/type/movie";
import { fetchMovies } from "../api/movies/route";
import MoviesList from "@/components/MoviesList";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: movies = [], isLoading } = useQuery<Movie[]>({
    queryKey: ["all-movies"],
    queryFn: fetchMovies,
  });

  const filteredMovies = movies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.mainCharacter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return <p className="text-white text-center mt-10">Loading movies...</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">🎬 All Movies</h1>

        <input
          type="text"
          placeholder="Search movie by name or main character..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-white"
        />


        {filteredMovies.length === 0 ? (
          <p className="text-gray-400">No movies match your search.</p>
        ) : (
          <div className="space-y-4">
            <MoviesList movies={filteredMovies} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
