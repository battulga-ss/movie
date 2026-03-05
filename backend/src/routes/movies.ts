import { Router } from "express";
import { getMovies, getMovieById, addMovie } from "../controllers/movieController";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/create-movie", addMovie);

export default router;