import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresDeleteTransactionRepository {
    async execute(TransactionId) {
        const transaction = await PostgresHelper.query(
            'DELETE FROM transaction WHERE ID = $1 RETURNING *',
            [TransactionId],
        )

        return transaction
    }
}
