import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

// routes
app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController()

    const response = await createUserController.execute(req)

    res.status(response.statusCode).json(response.body)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
