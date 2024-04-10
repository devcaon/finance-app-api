import { CreateUserUseCase } from '../use-cases/create-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { badRequest, created, serverError } from './helpers/http.js'
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseReponse,
    invalidPasswordResponse,
} from './helpers/user.js'

export class CreateUserController {
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

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }

            if (!checkIfPasswordIsValid(params.password)) {
                return invalidPasswordResponse()
            }

            if (!checkIfEmailIsValid(params.email)) {
                return emailAlreadyInUseReponse()
            }

            // chamar use case
            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(
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
