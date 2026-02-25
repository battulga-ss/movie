import { Router } from "express";
import {
  getMovies,
  getMovieById,
  getGenres,
} from "../controllers/movieController";

const router = Router();

router.get("/", getMovies);
router.get("/genres", getGenres);
router.get("/:id", getMovieById);
export default router;
