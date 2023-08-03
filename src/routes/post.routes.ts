import express from "express";
import { getPosts, post } from "../controllers/post.controller";

const router = express.Router();

router.get("/", post);
router.get("/:id", getPosts);

export default router;
