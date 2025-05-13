import { Like, Repository } from "typeorm";
import { Post } from "../entities/Post";
import { IPostRepository } from "./IPostRepository";
import { AppDataSource } from "../../../config/data-source";

export class PostRepository implements IPostRepository {

    private repository: Repository<Post>;

    constructor() {
        this.repository = AppDataSource.getRepository(Post);
    }

    async getPost(limit: number, page: number): Promise<Post[]> {
        return this.repository.find({
            take: limit,
            skip: (page - 1) * limit
        })
    }

    async getPostById(id: number): Promise<Post | null> {
        return this.repository.findOne({
            where: { id }
        })
    }

    async createPost(post: Post): Promise<Post> {
        return this.repository.save(post)
    }

    async updatePost(id: number, post: Partial<Post>): Promise<Post | null> {
        await this.repository.update(id, post);
        return this.getPostById(id);
    }

    async deletePost(id: number): Promise<void> {
        this.repository.delete(id);
    }

    async searchPost(keyword: string): Promise<Post[]> {
        return this.repository.find({
            where: [ 
                { title: Like(`%${keyword}%` ) },
                { subtitle: Like(`%${keyword}%` ) },
                { content: Like(`%${keyword}%` ) }
            ]
        }) 
    }
    
}