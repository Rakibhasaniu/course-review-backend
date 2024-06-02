import express from 'express'
import cors from 'cors'
import router from './app/routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('server is running')
})

// app.use(globalErrorHandler)
// app.use(notFound)
export default app
