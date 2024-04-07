import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

// User routes
app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(req)

    res.status(statusCode).send(body)
})

// app.patch('api/users/:userId', async (req, res) => {
//     const updateUserByIdController = new UpdateUserByIdController()

//     const { statusCode, body } = await updateUserByIdController.execute(req)

//     res.status(statusCode).send(body)
// })

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
