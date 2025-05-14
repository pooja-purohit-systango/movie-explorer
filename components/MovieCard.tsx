import { Movie } from '@/type/movie'
import AddToCartButton from './CartButton'

type MovieCardProps = {
  id: string
  name: string
  releaseDate: string
  mainCharacter: string
}

const MovieCard = ({ id, name, releaseDate, mainCharacter }: MovieCardProps) => {
  return (
    <div className="bg-gray-900 text-white border border-gray-800 rounded-xl p-6 shadow-lg w-full max-w-xs transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-400">
        <strong className="text-gray-300">Release Date:</strong> {new Date(releaseDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-400 mb-4">
        <strong className="text-gray-300">Main Character:</strong> {mainCharacter}
      </p>
      <AddToCartButton movie={{ id, name, releaseDate, mainCharacter }} />
    </div>
  )
}

export default MovieCard
