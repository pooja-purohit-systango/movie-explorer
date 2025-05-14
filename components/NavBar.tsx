'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { AiOutlineHeart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import Profile from './Profile';


const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-white-500 hover:text-gray-400 transition">
        MovieExplorer
      </Link>

 
      <div className="flex items-center space-x-6">
        <Link href="/watchlist" className="relative hover:text-red-400 transition">
          <AiOutlineHeart className="text-xl" />
        </Link>

        {session && (
          <div className="flex items-center space-x-2">
            <Link href='/profile'> 
            <FaUserCircle className="text-xl" />
            </Link>
          </div>
        )}
        
        {session ? (
          <></>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-white-600 px-4 py-1 rounded hover:bg-gray-700 transition"
          >
            Login
          </button>
        )
        }
      </div>
    </nav>
  )
}

export default Navbar
