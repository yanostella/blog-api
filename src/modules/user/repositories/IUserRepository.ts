import { User } from "../entities/User";

export interface IUserRepository {
    getUser(limit: number, page: number): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: Partial<User>): Promise<User | null>;
    deleteUser(id: number): Promise<void>;
}