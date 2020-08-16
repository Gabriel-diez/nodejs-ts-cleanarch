import UserRepository from '../user.repository';

const getUsers = async (repository: UserRepository) => {
    const users = await repository.findAll()
    return users;
}

export default getUsers;
