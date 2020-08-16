import mongoose, { Schema } from 'mongoose';
import BaseDTO from '../shared/base.dto';
import User from './user.model';

export default interface UserDTO extends BaseDTO, User {}