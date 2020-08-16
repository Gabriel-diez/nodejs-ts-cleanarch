import mongoose, { Model } from 'mongoose';
import BaseDTO from './base.dto';

export default interface BaseDatabase<BaseDTO> extends Model<any> {}