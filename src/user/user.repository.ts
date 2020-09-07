import bcrypt from 'bcryptjs';
import BaseRepository from '../shared/base.repository';
import BaseDatabase from '../shared/base.database';
import UserDTO from './user.dto';
import User from './user.model';

export default class UserRepository implements BaseRepository {
    private database: BaseDatabase<UserDTO>;

    constructor(database: BaseDatabase<UserDTO>) {
        this.database = database;
    }

    async findAll(): Promise<UserDTO[]> {
        const users: UserDTO[] = await this.database.find();
        return users;
    }
    
    async findById(id: string): Promise<UserDTO|null> {
        const user: UserDTO|null = await this.database.findById(id);
        return user;
    }

    async remove(id: string): Promise<any|null> {
        const result: any = await this.database.deleteOne({ _id: id });
        return result;
    }

    async add(user: User): Promise<UserDTO|null> {
        const userAdded: UserDTO = await this.database.create(user);
        return userAdded;
    }

    async update(id: string, user: User): Promise<UserDTO|null> {
        const userUpdated: UserDTO = await this.database.updateOne({ _id: id }, { $set: { ...user } })
        return userUpdated;
    }

    async findByCredentials(email: string, password: string): Promise<UserDTO> {
        const user: UserDTO|null = await this.database.findOne({ email });
        if (!user) {
            throw new Error("Invalid login Credentials");  
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Invalid login Credentials");  
        }
        return user;
    }
}