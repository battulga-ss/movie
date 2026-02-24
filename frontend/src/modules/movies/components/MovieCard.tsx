import { useState } from "react"
import { Star, Film } from "lucide-react"
import type { Movie } from "@/types/movie"

const MovieCard = ({ movie, onClick }: { movie: Movie; onClick: () => void }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer group hover:ring-2 hover:ring-red-500 transition-all duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div className="relative w-full h-72 bg-gray-700 flex items-center justify-center overflow-hidden">
        {movie.poster && !imgError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <Film className="w-16 h-16 text-gray-500" />
        )}
        {movie.imdb?.rating && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-yellow-400">{movie.imdb.rating}</span>
          </div>
        )}
      </div>
      <div className="p-3 space-y-1.5">
        <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs">{movie.year}</p>
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {movie.genres.slice(0, 2).map((g) => (
              <span key={g} className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { MovieCard }
