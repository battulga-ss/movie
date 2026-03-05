import { Router } from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  editMovie,
} from "../controllers/movieController";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/create-movie", addMovie);

router.put("/edit-movie/:id", editMovie);
export default router;
