import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const postgresGetUserByEmail =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail = await postgresGetUserByEmail.execute(
                updateUserParams.email,
            )

            if (userWithProvidedEmail) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = { ...updateUserParams }

        if (updateUserParams.password) {
            // criptografar a senha
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        // chamar repositório
        const postgresUpdateUserRepository = new PostgresCreateUserRepository()

        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
