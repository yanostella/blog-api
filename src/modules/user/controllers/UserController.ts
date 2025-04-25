import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserServices";
import { User } from "../entities/User";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const { limit, page } = req.query;
            const result = await userService.getUsers(Number(limit), Number(page));
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                const statusCode = (error as any).statusCode || 500;
                return res.status(statusCode).json({ message: error.message || 'Internal Server Error'});
            } else {
                return res.status(500).json({ message: 'Internal Server Error'});
            }
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await userService.getUserById(Number(id));
            return res.status(200).json(result)
        } catch (error) {
            if (error instanceof Error) {
                const statusCode = (error as any).statusCode || 500;
                return res.status(statusCode).json({ message: error.message || 'Internal Server Error'});
            } else {
                return res.status(500).json({ message: 'Internal Server Error'})
            }
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user: User = req.body;
            const result = await userService.createUser(user);
            return res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                const statusCode = (error as any).statusCode || 500;
                return res.status(statusCode).json({ message: error.message || 'Internal Server Error'});
            } else {
                return res.status(500).json({ message: 'Internal Server Error'})
            }        
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data : Partial<User> = req.body;
            const result = await userService.updateUser(Number(req.params.id), data);
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                const statusCode = (error as any).statusCode || 500;
                return res.status(statusCode).json({ message: error.message || 'Internal Server Error'});
            } else {
                return res.status(500).json({ message: 'Internal Server Error'})
            }        
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await userService.deleteUser(Number(id));
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                const statusCode = (error as any).statusCode || 500;
                return res.status(statusCode).json({ message: error.message || 'Internal Server Error'});
            } else {
                return res.status(500).json({ message: 'Internal Server Error'})
            }  
        }
    }

}

export const userController = new UserController;