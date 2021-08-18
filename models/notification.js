let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp');
const axios = require("axios");
let Event = require('../models/event');

var NotificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    owner :{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

NotificationSchema.methods.notify = function(event) {
    console.log(event)
    let data = {
        "text": event.monitor.name + ": " + event.type,
        "blocks": [{
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": event.monitor.name + ": " + event.type,
            },
        },
        {
            "type": "section",
            "fields": [{
                "type": "mrkdwn",
                "text": "*Message*\n" + event.message,
            },
            {
                "type": "mrkdwn",
                "text": "*Time (UTC)*\n" + event.createdAt,
            }],
        }],
    }

    axios.post(this.url, data)
 
}

NotificationSchema.plugin(timestamps); // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Notification', NotificationSchema)