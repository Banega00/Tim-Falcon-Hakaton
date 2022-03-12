import { PostController } from './../api/post.controller';
import express from "express";

const router = express.Router()

const postController = new PostController()

router.get("/posts", postController.getAllPosts)
router.get("/post/:id", postController.getPostById)
router.delete("/post/:id", postController.deletePostById)

export const PostRouter = router;