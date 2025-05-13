import { Router } from "express";
import { postController } from "../controller/PostController";

const postRoutes = Router();

postRoutes.get("/", (req, res) => {
    postController.getPosts(req, res);
})

postRoutes.get("/search", (req, res) => {
    postController.searchPost(req, res);
})

postRoutes.get("/:id", (req, res) => {
    postController.getPostById(req, res);
})

postRoutes.post("/", (req, res) => {
    postController.createPost(req, res);
})

postRoutes.put("/:id", (req, res) => {
    postController.updatePost(req, res);
})

postRoutes.delete("/:id", (req, res) => {
    postController.deletePost(req, res);
})

export default postRoutes; 