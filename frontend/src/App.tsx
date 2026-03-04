import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviesPage from "@/pages/movies/MoviesPage";
import MovieDetailPage from "@/pages/movies/MovieDetailPage";
import { AdminLayout } from "./modules/admin/AdminLayout";
import { AdminDashboardLayout } from "./modules/admin/AdminDashboardLayout";
import { AuthProviderEffect } from "./modules/admin/auth/AuthProviderEffect";
import { LoginPage } from "./pages/admin/auth/LoginPage";
import { MoviesAdminPage } from "./pages/admin/movies/MoviesAdminPage";
import { CreateMoviePage } from "./pages/admin/movies/CreateMoviePage";
import { EditMoviePage } from "./pages/admin/movies/EditMoviePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="login" element={<LoginPage />} />

          <Route element={<AuthProviderEffect />}>
            <Route element={<AdminDashboardLayout />}>
              <Route path="movies" element={<MoviesAdminPage />} />
              <Route path="create-movie" element={<CreateMoviePage />} />
              <Route path="edit-movie/:id" element={<EditMoviePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
