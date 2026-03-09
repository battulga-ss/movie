import { useState } from "react";
import { useMovies } from "@/modules/movies/hooks/useMovies";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const MoviesView = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useMovies({ page });

  if (isLoading) return <p className="text-gray-500">Loading movies...</p>;
  if (isError) return <p className="text-red-500">Failed to load movies.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Movies</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Title
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Year
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Genres
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.movies
              ?.slice()

              .map((movie) => (
                <tr key={movie._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    <Link
                      to={`/admin/edit-movie/${movie._id}`}
                      className="hover:underline"
                    >
                      {movie.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{movie.year}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {movie.genres?.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {movie.imdb?.rating ?? "—"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Page {page} of {data?.totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page === data?.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
