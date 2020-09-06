import express, { Router } from 'express';
import UserController from './user.controller';
import UserRepository from './user.repository'
import UserDatabase from './data-access/database';

const router: Router = express.Router();

const userRepository = new UserRepository(UserDatabase);
const controller = new UserController(userRepository);

router.get('/users', controller.getUsers);
router.get('/users/:userId', controller.getUser);
router.post('/users', controller.addUser);
router.patch('/users/:userId', controller.editUser);
router.delete('/users/:userId', controller.deleteUser);
router.post('/users/login', controller.loginUser);


export default router;
