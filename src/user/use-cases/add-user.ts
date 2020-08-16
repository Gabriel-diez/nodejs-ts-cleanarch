import UserRepository from '../user.repository';
import User from '../user.model';

const addUser = async (repository: UserRepository, userModel: User) => {
    const user = await repository.add(userModel);
    return user;
}

export default addUser;
