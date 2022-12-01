import express from 'express'
import colors from 'colors'
import UserRoute from './routes/UserRoute.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use('/api/users', UserRoute)

const PORT = 5000
app.listen(
  PORT,
  console.log(`Server running in ${PORT} mode on port ${PORT}`.yellow.bold)
)
