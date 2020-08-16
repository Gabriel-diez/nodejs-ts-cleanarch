import baseDTO from "./base.dto";
import BaseDTO from './base.dto';
import BaseModel from "./base.model";

export default interface BaseRepository {
    findAll(): Promise<BaseDTO[]>;
    findById(id: string): Promise<BaseDTO|null>;
    remove(id: string): Promise<BaseDTO|null>;
    add(model: BaseModel): Promise<BaseDTO|null>;
    update(id: string, model: BaseModel): Promise<BaseDTO|null>;
}