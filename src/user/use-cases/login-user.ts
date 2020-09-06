import UserRepository from '../user.repository';

const loginUser = async (repository: UserRepository, email: string, password: string) => {
    const user = await repository.findByCredentials(email, password);
    return user;
}

export default loginUser;
