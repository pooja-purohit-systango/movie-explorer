'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { AiOutlineHeart } from 'react-icons/ai';


const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-white-500 hover:text-gray-400 transition">
        MovieExplorer
      </Link>

      {/* Navigation Items */}
      <div className="flex items-center space-x-6">
        {/* Cart */}
        <Link href="/watchlist" className="relative hover:text-red-400 transition">
          <AiOutlineHeart className="text-xl" />
        </Link>

        {/* Auth Button */}
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-white-600 px-4 py-1 rounded hover:bg-gray-700 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-white-600 px-4 py-1 rounded hover:bg-gray-700 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
