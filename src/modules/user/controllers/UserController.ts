import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
    async getUsers(req: Request, res: Response) {
        const { limit, page } = req.query;
        try {
            const result = await userService.getUser(Number(limit), Number(page));
            return res.status(200).json(result);
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await userService.getUserById(Number(id));
            return res.status(200).json(result)
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });
        }
    }

    async createUser(req: Request, res: Response) {
        const user: User = req.body;
        try {
            const result = await userService.createUser(user);
            return res.status(201).json(result);
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data : Partial<User> = req.body;
            const result = await userService.updateUser(Number(id), data);
            return res.status(200).json(result);
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await userService.deleteUser(Number(id));
            return res.status(204).send();
        } catch (error) {
            const statusCode = (error as any).statusCode || 500;
            const message = (error as any).message || 'Internal Server Error';
            return res.status(statusCode).json({ message });
        }
    }

}

export const userController = new UserController;