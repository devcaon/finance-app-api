import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js'

export class DeleteUserUseCase {
    async execute(userId) {
        // chamar repository
        const deleteUserRepository = new PostgresDeleteUserRepository()

        const deleteUser = await deleteUserRepository.execute(userId)

        return deleteUser
    }
}
