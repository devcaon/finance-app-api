export class DeleteTransactionUseCase {
    constructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository
    }
    async execute(transactionId) {
        // executar repository
        const transaction =
            await this.deleteTransactionRepository.execute(transactionId)

        return transaction
    }
}
