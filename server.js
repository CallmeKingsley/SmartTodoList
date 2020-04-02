const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('./Routes/Api')
const config = require('./Config')


config.mongodbConfig()

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app entry point
app.use('/api', api)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('connected')
})

