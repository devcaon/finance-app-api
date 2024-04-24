import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
        this.getUserBalanceRepository = getUserBalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        // check if user exists
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            // if user not found
            throw new UserNotFoundError(params.userId)
        }

        // call user balance repository
        const balance = await this.getUserBalanceRepository.execute(
            params.userId,
        )

        return balance
    }
}
