import { UserNotFoundError } from '../../errors/user.js'

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository, getUserByIdRepository) {
        this.updateTransactionRepository = updateTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        // verificar se usuário existe
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        // chama repository
        const updatedTransaction =
            await this.updateTransactionRepository.execute(params)

        return updatedTransaction
    }
}
