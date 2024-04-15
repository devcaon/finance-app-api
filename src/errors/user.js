export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The email ${email} provider is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with id ${userId} not found.`)
        this.name = 'UserNotFoundError'
    }
}
