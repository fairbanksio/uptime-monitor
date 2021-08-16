// Setup Express
const PORT = process.env.PORT || 8080
const app = require('./app.js')

// Launch the App
app.listen(PORT, '0.0.0.0')
console.log(`uptime-monitor is up and running...`) // eslint-disable-line
