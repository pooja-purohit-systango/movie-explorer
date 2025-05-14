'use client'

import { useSession, signOut } from 'next-auth/react'
import { FaUserCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <p className="text-center text-white mt-10">Loading your profile...</p>
  }

  if (!session) {
    router.push('/signin') 
    return null
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 flex flex-col items-center">
      <div className="bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <FaUserCircle className="text-6xl text-gray-400 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">Welcome, {session.user?.name}</h1>
        <p className="text-sm text-gray-400 mb-6">{session.user?.email}</p>

        <button
            onClick={() => signOut()}
            className="bg-white-600 px-4 py-1 rounded hover:bg-gray-700 transition"
          >
            Logout
          </button>
      </div>
    </div>
  )
}

export default Profile
