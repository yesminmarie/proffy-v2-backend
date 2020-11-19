import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        const user = await createUser.execute({
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            whatsapp: '123456789',
            bio: 'teste',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with the same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        await createUser.execute({
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            whatsapp: '123456789',
            bio: 'teste',
            password: '123456',
        });

        expect(
            createUser.execute({
                firstname: 'John',
                lastname: 'Doe',
                email: 'johndoe@example.com',
                whatsapp: '123456789',
                bio: 'teste',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
