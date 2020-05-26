require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const log = require('console-emoji')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri =
	'mongodb+srv://admin:passwordpassword@cluster0-b0faw.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
	log('Connected to mongo instance :sunglasses:')
})
mongoose.connection.on('error', err => {
	log('Error connecting to mongo :sob:', err)
})

app.get('/', requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
	log('Listening on port 3000 :computer:')
})
