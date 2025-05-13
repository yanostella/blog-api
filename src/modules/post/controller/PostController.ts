import { Request, Response } from "express";
import { UserRepository } from "../../user/repositories/UserRepository";
import { PostRepository } from "../repositories/PostRepository";
import { PostService } from "../services/PostService";
import { Post } from "../entities/Post";

const postRepository = new PostRepository();
const userRepository = new UserRepository();
const postService = new PostService(postRepository, userRepository);

export class PostController {
    async getPosts(req: Request, res: Response) {
        const { limit, page } = req.query;
        try {
            const result = await postService.getPost(Number(limit), Number(page));
            return res.status(200).json(result);
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });
        }
    }


    async getPostById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await postService.getPostById(Number(id));
            return res.status(200).json(result);
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });
        }
    }

    async createPost(req: Request, res: Response) {
        const post: Post = req.body;
        try {
            const result = await postService.createPost(post);
            return res.status(201).json(result);
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });            
        }
    }

    async updatePost(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: Partial<Post> = req.body;
            const updated = await postService.updatePost(Number(id), data);
            return res.status(200).json(updated);
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });               
        }
    }

    async deletePost(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await postService.deletePost(Number(id));
            return res.status(204).send();
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });                
        }
    }

    async searchPost(req: Request, res: Response) {
        const { keyword } = req.query;
        try {
            if (!keyword || typeof keyword !== 'string' || keyword.trim().length === 0) {
                return res.status(400).json({ message: 'Keyword is required.' });
            }
            const result = await postService.searchPost(String(keyword));
            return res.status(200).json(result);
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });             
        }
    }
}

export const postController = new PostController();