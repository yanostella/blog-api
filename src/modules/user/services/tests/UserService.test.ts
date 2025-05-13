import e from "express";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository"
import { UserService } from "../UserService";

describe('UserService', () => {
    let userRepositoryMock: jest.Mocked<IUserRepository>;
    let service: UserService;

    beforeEach(() => {
        userRepositoryMock = {
            getUser: jest.fn(),
            getUserById: jest.fn(),
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        };
    
        service = new UserService(userRepositoryMock);
    });

    describe('getUser', () => {
        it('should return user lists limited by params', async () => {
            userRepositoryMock.getUser.mockResolvedValue([{ id: 1, email: 'alana@example.com', name: 'Alana', role: 'Professor', active: true }]);
            const result = await service.getUser(10, 1);
            expect(userRepositoryMock.getUser).toHaveBeenCalledWith(10, 1);
            expect(result).toEqual([{ id: 1, email: 'alana@example.com', name: 'Alana', role: 'Professor', active: true }]);
        })
    });

    describe('getUserById', () => {
        it('should return user called by id if exists', async () => {
            const user = { id: 2, email: 'bob@example.com', name: 'Bob', role: 'Professor', active: true } as User;
            userRepositoryMock.getUserById.mockResolvedValue(user);

            const result = await service.getUserById(2);
            expect(userRepositoryMock.getUserById).toHaveBeenLastCalledWith(2);
            expect(result).toBe(user);
        });

        it('should throw error if not exists', async () => {
            userRepositoryMock.getUserById.mockResolvedValue(null);
            await expect (service.getUserById(5))
                .rejects
                .toThrow('User with this ID not found');
    });

    });

    describe('createUser', () => {
        it('should create user if user with this email not exists', async () => {
            const newUser = { email: 'bob@example.com', name: 'Bob', role: 'Aluno', active: true } as User;
            userRepositoryMock.getUserByEmail.mockResolvedValue(null);
            userRepositoryMock.createUser.mockResolvedValue({ ...newUser, id: 4 });

            const result = await service.createUser(newUser);
            expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(newUser.email);
            expect(userRepositoryMock.createUser).toHaveBeenCalledWith(newUser);
            expect(result).toEqual({ ...newUser, id: 4 });
        })

        it('should throw error if user with this email already exists.', async () => {
            const existingUser = { email: 'bob@example.com', name: 'Bob', role: 'Aluno', active: true } as User;
            userRepositoryMock.getUserByEmail.mockResolvedValue(existingUser);

            await expect(service.createUser(existingUser))
                .rejects
                .toThrow('User with this email already exists.');
        });
    });

    describe('updateUser', () => {
        it('should update name and email', async () => {
            const user = { id: 8, email: 'bob@example.com', name: 'Bob', role: 'Aluno', active: true } as User;
            userRepositoryMock.getUserById.mockResolvedValue(user);
            userRepositoryMock.updateUser.mockResolvedValue({ ...user, name: 'Boby', email: 'bobyb@example.com'});

            const result = await service.updateUser(8, {name: 'Boby', email: 'bobyb@example.com'} as any);
            expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(8);
            expect(userRepositoryMock.updateUser).toHaveBeenCalledWith(8, { name: 'Boby', email: 'bobyb@example.com' });
            expect(result).toEqual({ ...user, name: 'Boby', email: 'bobyb@example.com'});
        });

        it('should throw error if user not exists', async () => {
        userRepositoryMock.getUserById.mockResolvedValue(null);
        await expect(service.updateUser(99, {}))
            .rejects
            .toThrow('User with this ID not found.');
        });        
    });

    describe('deleteUser', () => {
        it('deve chamar getUserById e depois deleteUser', async () => {
        const user = { id: 11, email: 'bob@example.com', name: 'Bob', role: 'Aluno', active: true } as User;
        userRepositoryMock.getUserById.mockResolvedValue(user);
        userRepositoryMock.deleteUser.mockResolvedValue(undefined);

        const result = await service.deleteUser(11);
        expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(11);
        expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(11);
        expect(result).toBeUndefined();
        });

        it('deve lançar erro se não encontrar usuário', async () => {
        userRepositoryMock.getUserById.mockResolvedValue(null);
        await expect(service.deleteUser(123))
            .rejects
            .toThrow('User with this ID not found.');
        });
    });

})