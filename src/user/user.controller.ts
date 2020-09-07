import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import User from './user.model';
import {
    getUsersUseCase,
    getUserUseCase,
    deleteUserUseCase,
    addUserUseCase,
    editUserUseCase,
    loginUserUseCase,
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
            this.returnError(err, res, 400);
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const user = await getUserUseCase(this.repository, userId);
            res.status(200).json(user);
        } catch (err) {
            this.returnError(err, res, 400);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const result = await deleteUserUseCase(this.repository, userId);
            res.status(200).json(result);
        } catch (err) {
            this.returnError(err, res, 400);
        }
    }

    addUser = async (req: Request, res: Response) => {
        try {
            const {
                email,
                firstName,
                lastName,
                password,
            } = req.body;

            const userModel: User = {
                email,
                firstName,
                lastName,
                password,
            };
            
            const user = await addUserUseCase(this.repository, userModel);
            res.status(201).json(user);
        } catch (err) {
            this.returnError(err, res, 400);
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
            this.returnError(err, res, 400);
        }
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const {
                email,
                password,
            } = req.body;
            const user = await loginUserUseCase(this.repository, email, password);
            const token = jwt.sign(
                { userId: user._id },
                `${process.env.JWT_KEY}`,
                { expiresIn: "1h" }
              );
            res.status(200).header({ 'access-token': token }).json(user);
        } catch (err) {
            this.returnError(err, res, 422);
        }
    }

    returnError = (err: Error, res: Response, status: number) => {
        const {
            message,
        } = err;
        res.status(status).json({ message });
    }
}