import { useState } from "react";
import { Star, Film } from "lucide-react";
import type { Movie } from "@/types/movie";

const fallbackPoster =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTC5bFSkuyK5Kn9RT1dnOvPmV2R_3NixiXw&s";

const MovieCard = ({
  movie,
  onClick
}: {
  movie: Movie;
  onClick: () => void;
}) => {
  const [imgError, setImgError] = useState(false);

  const posterToShow = !imgError && movie.poster ? movie.poster : fallbackPoster;

  return (
    <div
      className="border rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <div className="relative w-full h-72 bg-muted flex items-center justify-center overflow-hidden">
        <img
          src={posterToShow}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />

        {movie.imdb?.rating && (
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold">{movie.imdb.rating}</span>
          </div>
        )}
      </div>

      <div className="p-3 space-y-1.5">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-muted-foreground text-xs">{movie.year}</p>

        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {movie.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { MovieCard };