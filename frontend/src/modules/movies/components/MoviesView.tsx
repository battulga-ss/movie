import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Search, ChevronLeft, ChevronRight, Film } from "lucide-react"
import { useMovies } from "@/modules/movies/hooks/useMovies"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MovieCard } from "./MovieCard"
import { MovieCardSkeleton } from "./MovieCardSkeleton"

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Romance", "Thriller", "Animation", "Documentary", "Crime", "Sci-Fi"]

const MoviesView = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "")

  const page = Number(searchParams.get("page") ?? "1")
  const search = searchParams.get("search") ?? ""
  const selectedGenre = searchParams.get("genre") ?? ""

  const { data, isLoading, isError, refetch } = useMovies({
    page,
    limit: 20,
    search: search || undefined,
    genre: selectedGenre || undefined,
  })

  const movies = data?.movies ?? []
  const totalPages = data?.totalPages ?? 1
  const total = data?.total ?? 0

  const setParam = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      Object.entries(updates).forEach(([k, v]) => {
        if (v) next.set(k, v)
        else next.delete(k)
      })
      return next
    })
  }

  const handleSearch = (e: { preventDefault(): void }) => {
    e.preventDefault()
    setParam({ search: searchInput, page: "1" })
  }

  const handleGenreSelect = (genre: string) => {
    setParam({ genre: selectedGenre === genre ? "" : genre, page: "1" })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            <Film className="w-6 h-6 text-red-500" />
            <span className="text-xl font-bold text-red-500 tracking-tight">CineDB</span>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
              />
            </div>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
              Search
            </Button>
          </form>
          {total > 0 && (
            <span className="text-gray-400 text-sm ml-auto hidden md:block">
              {total.toLocaleString()} movies
            </span>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setParam({ genre: "", page: "1" })}
            className={`rounded-full text-xs ${
              !selectedGenre
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All
          </Button>
          {GENRES.map((genre) => (
            <Button
              key={genre}
              variant="ghost"
              size="sm"
              onClick={() => handleGenreSelect(genre)}
              className={`rounded-full text-xs ${
                selectedGenre === genre
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {genre}
            </Button>
          ))}
        </div>

        {(search || selectedGenre) && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <span>Showing results for:</span>
            {search && <Badge variant="secondary" className="bg-gray-700 text-gray-200">"{search}"</Badge>}
            {selectedGenre && <Badge variant="secondary" className="bg-gray-700 text-gray-200">{selectedGenre}</Badge>}
            <button
              onClick={() => { setSearchInput(""); setParam({ search: "", genre: "", page: "1" }) }}
              className="text-red-400 hover:text-red-300 underline ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {isError && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg p-6 text-center mb-6">
            <p className="font-medium">Failed to load movies. Make sure the backend server is running on port 5000.</p>
            <Button
              onClick={() => refetch()}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              Try Again
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading
            ? Array.from({ length: 20 }).map((_, i) => <MovieCardSkeleton key={i} />)
            : movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={() => navigate(`/movies/${movie._id}`)}
                />
              ))}
        </div>

        {!isLoading && !isError && movies.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No movies found</p>
            <p className="text-sm mt-1">Try a different search or genre filter.</p>
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setParam({ page: String(Math.max(1, page - 1)) })}
              disabled={page === 1}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="text-gray-400 text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setParam({ page: String(Math.min(totalPages, page + 1)) })}
              disabled={page === totalPages}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-40"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

export { MoviesView }
