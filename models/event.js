let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp')
const axios = require('axios')

var EventSchema = new mongoose.Schema({
  monitor: {
    type: Schema.Types.ObjectId,
    ref: 'Monitor',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
})

EventSchema.plugin(timestamps) // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Event', EventSchema)
