let mongoose = require('mongoose')
let timestamps = require('mongoose-timestamp');

var MonitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    keyword: {
        type: String,
    },
    status: {

    }
});

// Configure plugins
MonitorSchema.plugin(timestamps); // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Monitor', MonitorSchema)