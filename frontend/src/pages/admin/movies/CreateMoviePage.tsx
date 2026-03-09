import { CreateMovieForm } from "@/modules/admin/movies/CreateMovieForm";

export const CreateMoviePage = () => {
  return (
    <div className="min-h-screen flex items-start justify-center pt-10 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Create Movie</h1>
        <CreateMovieForm />
      </div>
    </div>
  );
};