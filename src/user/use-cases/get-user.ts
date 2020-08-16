import UserRepository from '../user.repository';
import UserDTO from '../user.dto';

const getUser = async (repository: UserRepository, id: string) => {
    const user = await repository.findById(id)
    if (user) {
        return user;
    }
    throw new Error("User doesn't exist");  
}

export default getUser;
