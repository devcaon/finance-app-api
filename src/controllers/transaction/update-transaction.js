import {
    badRequest,
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            // verificar se id da transaction é válido
            if (!checkIfIdIsValid(httpRequest.params.transactionId)) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            // verificar se passados campos inválidos
            const allowedFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }

            // caso amount tenha sido passado verificar se é válido
            if (params.amount) {
                if (!checkIfAmountIsValid(params.amount)) {
                    return invalidAmountResponse()
                }
            }

            // vericar se type é válido
            if (params.type && !checkIfTypeIsValid(params.type)) {
                return invalidTypeResponse()
            }

            const transaction = await this.updateTransactionUseCase.execute(
                httpRequest.params.transactionId,
                params,
            )

            return ok(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
