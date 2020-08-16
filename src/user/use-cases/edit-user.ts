import UserRepository from '../user.repository';
import User from '../user.model';

const editUser = async (repository: UserRepository, id: string, userModel: User) => {
    let user = await repository.findById(id);
    if (user) {
        const userUpdate = await repository.update(id, userModel);
        return userUpdate;
    }
    throw new Error("User doesn't exist");  
}

export default editUser;