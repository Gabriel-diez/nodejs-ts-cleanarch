import mongoose, { Schema } from 'mongoose';
import UserDTO from '../user.dto';
import UserSchema from './schema'

export default mongoose.model<UserDTO>('User', UserSchema);