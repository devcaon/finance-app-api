export class DeleteTransactionUseCase {
    contructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository
    }

    async execute(transactionId) {
        // chamar repository
        const transaction =
            await this.deleteTransactionRepository.execute(transactionId)

        return transaction
    }
}
