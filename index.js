import 'dotenv/config.js'
import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

const PORT = process.env.PORT

app.get('/', async (request, response) => {
    const results = await PostgresHelper.query('SELECT * FROM users')

    response.send(JSON.stringify(results))
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
