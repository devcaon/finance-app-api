import validator from 'validator'
import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers.js'

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

            if (params.password.length < 6) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                })
            }

            if (!validator.isEmail(params.email)) {
                return badRequest({
                    message: 'Invalid e-mail. Please provide a valid one.',
                })
            }

            // chamar use case
            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(
                httpRequest.body,
            )

            // retornar a resposta para o usuário (status code)
            return created(createdUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
