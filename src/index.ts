import express, { Router, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRoute from './user/users.route';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(usersRoute);

mongoose.connect(
    'mongodb://localhost/typescript',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
     },
    () => {     
        console.log('connected to db');
    });
