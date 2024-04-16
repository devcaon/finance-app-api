import validator from 'validator'
import { UserNotFoundError } from '../../errors/user.js'
import {
    serverError,
    badRequest,
    invalidIdResponse,
    checkIfIdIsValid,
    created,
    validateRequiredFields,
    requiredFieldsIsMissingResponse,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // validar a requisição (campos obrigatórios, tamanho de senha e e-mail)
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            const { ok, missingField } = validateRequiredFields(
                params,
                requiredFields,
            )

            if (!ok) {
                return requiredFieldsIsMissingResponse(missingField)
            }

            // verifica se user_id é válido
            if (!checkIfIdIsValid(params.user_id)) {
                return invalidIdResponse()
            }

            // verificar se amount tem 2 casas decimais
            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                })
            }

            const type = params.type.trim().toUpperCase()

            // verificar se type é válido
            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )

            if (!typeIsValid) {
                return badRequest({
                    message: 'The type must be EARNING, EXPENSE or INVESTMENT',
                })
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })

            return created(transaction)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
