var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongoose = require('mongoose')
var passport = require('passport')
const path = require('path')
var cors = require('cors')
const os = require('os')

var apiRouter = require('./routes/api')

var monitoringService = require('./services/monitoring')

require('dotenv').config() // eslint-disable-line

var app = express()
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
)

// Initialize and configure passport to use session.
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')

// use morgan to log requests to the console
var morganOptions = {
  skip: function (req, res) {
    return req.get('/healthz') // don't log the healthz heartbeats
  },
}
app.use(logger('dev', morganOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost/uptime-monitor', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .catch(
      (err) => console.warn(`MongoDB connect error: ${err}`) // eslint-disable-line no-console
    )
}

connectToDB()

mongoose.connection.on('connected', () => {
  console.log('uptime-monitor is connected to MongoDB...') // eslint-disable-line no-console
})

if (process.env.NODE_ENV.trim() === 'production') {
  mongoose.connection.on('disconnected', (err) => {
    console.warn(`MongoDB disconnected: ${err}`) // eslint-disable-line no-console
    setTimeout(() => {
      connectToDB()
    }, 3000)
  })

  mongoose.connection.on('error', (err) => {
    console.warn(`MongoDB error: ${err}`) // eslint-disable-line no-console
    setTimeout(() => {
      connectToDB()
    }, 3000)
  })
}

app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/api', apiRouter)
// Handle livenessProbe
app.get('/healthz', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  res
    .send({
      response: {
        msg: 'ok',
        host: os.hostname(),
        clientSourceIP: ip,
      },
    })
    .status(200)
})

app.get('*', function (req, res, next) {
  // Route everything except api to client build
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ error: err.message })
})

monitoringService.startAllMonitors()

module.exports = app
