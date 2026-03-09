import { Router } from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  editMovie,
  deleteMovie,
} from "../controllers/movieController";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/create-movie", addMovie);
router.delete("/delete-movie/:id", deleteMovie);
router.put("/edit-movie/:id", editMovie);
export default router;
