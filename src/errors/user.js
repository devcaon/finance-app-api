export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The email ${email} provider is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}
