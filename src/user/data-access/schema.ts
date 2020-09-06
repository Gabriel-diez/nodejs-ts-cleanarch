import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import UserDTO from '../user.dto';

const userSchema: Schema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
      const currentPassword = this.get('password');
      const hashedPassword = await bcrypt.hash(currentPassword, 8)
      this.set('password', hashedPassword);
  }
  next();
})

export default userSchema;