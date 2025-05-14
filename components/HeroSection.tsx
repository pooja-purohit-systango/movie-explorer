import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
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

  )
}

export default HeroSection