import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

export class UserService {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async getUsers(limit: number, page: number) {
        return this.userRepository.getUser(limit, page);
    }

    async getUserById(id: number) {
        //Criar uma classe de erros personalizada depois
        const user = await this.userRepository.getUserById(id); 
        if (!user) {
            throw new Error('User with this ID not found.');
        }
        return user;
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }
    
    async createUser(user: User) {
        const userExists = await this.userRepository.getUserByEmail(user.email);
        if (userExists) {
            throw new Error('User with this e-mail already exists.');
        }
        return this.userRepository.createUser(user);
    }

    async updateUser(id: number, user: Partial<User>) {
        await this.getUserById(id);
        const allowedFiels: Partial<User> = {
            name: user.name,
            email: user.email
        };
        return this.userRepository.updateUser(id, allowedFiels);
    }

    async deleteUser(id: number) {
        await this.getUserById(id);
        return this.userRepository.deleteUser(id);
    }
}