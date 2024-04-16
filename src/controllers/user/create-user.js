import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseReponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // validar a requisição (campos obrigatórios, tamanho de senha e e-mail)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const { ok, missingField } = validateRequiredFields(
                params,
                requiredFields,
            )

            if (!ok) {
                return badRequest({
                    message: `The field ${missingField} is required`,
                })
            }

            if (!checkIfPasswordIsValid(params.password)) {
                return invalidPasswordResponse()
            }

            if (!checkIfEmailIsValid(params.email)) {
                return emailIsAlreadyInUseReponse()
            }

            // chamar use case
            // const createUserUseCase = new CreateUserUseCase()

            const createdUser = await this.createUserUseCase.execute(
                httpRequest.body,
            )

            // retornar a resposta para o usuário (status code)
            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
