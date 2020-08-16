import UserRepository from '../user.repository';
import User from '../user.model';

const deleteUser = async (repository: UserRepository, id: string) => {
    const result = await repository.remove(id);
    return result;
}

export default deleteUser;
