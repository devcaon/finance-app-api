import { UserNotFoundError } from '../../errors/user.js'
import { v4 as uuidV4 } from 'uuid'

export class CreateTransactionUseCase {
    // dependency injection
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(createTransactionParams) {
        const userId = createTransactionParams.userId

        // verificar se usuário existe pelo ID
        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        // criar ID da transaction
        const transactionId = uuidV4()

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })

        return transaction
    }
}
