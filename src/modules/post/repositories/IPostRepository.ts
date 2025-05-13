import { Post } from "../entities/Post";

export interface IPostRepository {
    getPost(limit: number, page: number): Promise<Post[]>;
    getPostById(id: number): Promise<Post | null>;
    createPost(post: Post): Promise<Post>;
    updatePost(id: number, post: Partial<Post>): Promise<Post | null>;
    deletePost(id: number): Promise<void>;
    searchPost(keyword: string): Promise<Post[]>
}