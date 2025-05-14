import Image from "next/image";
import Link from "next/link";
import { fetchMovies } from "./api/movies/route";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/type/movie";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const movies: Movie[] = await fetchMovies();
  const featuredMovies = movies.filter((movie) => movie.isFeatured === true);
  return (
    <div className="min-h-screen p-6 sm:p-20 bg-gray-950 text-white font-sans">
      {/* Hero Banner */}
      <section className="w-full text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          🎬 Welcome to Movie Explorer
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto">
          Discover popular movies, explore genres, and manage your watchlist —
          all in one place!
        </p>
        <Link href="/movies">
          <button className="mt-6 px-6 py-2 bg-black hover:bg-white text-white hover:text-black font-semibold rounded-lg border border-white transition">
            Browse Movies
          </button>
        </Link>
      </section>

      {/* Featured Movies (Static Placeholder for now) */}
      <section className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 border-b border-gray-700 pb-2">
          🔥 Featured Movies
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
    </div>
  );
}
