import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import bcrypt from 'bcrypt'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const postgresGetUserByEmail =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail = await postgresGetUserByEmail.execute(
                updateUserParams.email,
            )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
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
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
