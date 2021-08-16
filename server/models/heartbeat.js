let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp');
const axios = require("axios");

var HeartbeatSchema = new mongoose.Schema({
    monitor: {
        type: Schema.Types.ObjectId,
        ref: 'Monitor',
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    statusMessage:{
        type: String,
    }
});

HeartbeatSchema.plugin(timestamps); // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Heartbeat', HeartbeatSchema)