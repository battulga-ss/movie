import { Router } from "express";
import { login, meController } from "../controller/auth";
import { addMovie } from "../../controllers/movieController";

const router = Router();

router.get("/me", meController);

router.post("/login", login);

export default router;
