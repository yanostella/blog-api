import { Post } from "../entities/Post";
import { IPostRepository } from "../repositories/IPostRepository";
import { IUserRepository } from '../../user/repositories/IUserRepository';

export class PostService {
    constructor(
        private postRepository: IPostRepository,
        private userRepository: IUserRepository
    ) {}
    

    async getPost(limit:number, page: number) {
        return this.postRepository.getPost(limit, page);
    }

    async getPostById(id: number) {
        const post = await this.postRepository.getPostById(id);
        if (!post) {
            throw new Error('Post with this ID not found.');
        }
        return post;
    }

    async createPost(post: Post) {
        const user = await this.userRepository.getUserById(post.user_id);
        if (!user) {
            throw new Error('User with this ID not found.');
        } 
        if (!post.title || !post.content) {
            throw new Error('Title and content are required.')
        }
        return this.postRepository.createPost(post);
    }

    async updatePost(id: number, post: Partial<Post>) {
        await this.getPostById(id);
        return this.postRepository.updatePost(id, post);
    }

    async deletePost(id: number) {
        await this.getPostById(id);
        return this.postRepository.deletePost(id);
    }

    async searchPost(keyowd: string) {
        const posts = await this.postRepository.searchPost(keyowd.trim());
        if (!posts.length) {
            throw new Error('Posts with this keyword not found.');
        }
        return posts;
    }
} 