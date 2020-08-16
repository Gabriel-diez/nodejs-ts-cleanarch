import { Request, Response, NextFunction } from 'express';
import User from './user.model';
import {
    getUsersUseCase,
    getUserUseCase,
    deleteUserUseCase,
    addUserUseCase,
    editUserUseCase,
} from './use-cases';
import UserRepository from './user.repository';

export default class UserController {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await getUsersUseCase(this.repository);
            res.status(200).json(users);
        } catch (err) {
            const {
                message,
            } = err;
            res.status(400).json({ message });
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const user = await getUserUseCase(this.repository, userId);
            res.status(200).json(user);
        } catch (err) {
            const {
                message,
            } = err;
            res.status(400).json({ message });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const result = await deleteUserUseCase(this.repository, userId);
            res.status(200).json(result);
        } catch (err) {
            const {
                message,
            } = err;
            res.status(400).json({ message });
        }
    }

    addUser = async (req: Request, res: Response) => {
        try {
            const {
                email,
                firstName,
                lastName,
            } = req.body;

            const userModel: User = {
                email,
                firstName,
                lastName,
            };
            
            const user = await addUserUseCase(this.repository, userModel);
            res.status(201).json(user);
        } catch (err) {
            const {
                message,
            } = err;
            res.status(400).json({ message });
        }
    }

    editUser = async (req: Request, res: Response) => {
        try {
            const {
                userId,
            } = req.params;
            const userModel: User = {
                ...req.body
            };
            
            const user = await editUserUseCase(this.repository, userId, userModel);
            res.status(200).json(user);
        } catch (err) {
            const {
                message,
            } = err;
            res.status(400).json({ message });
        }
    }
}