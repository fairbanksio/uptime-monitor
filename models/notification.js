let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp')
const axios = require('axios')

var NotificationSchema = new mongoose.Schema({
  monitors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Monitor',
    },
  ],
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  config: {
    slackWebhook: { type: String },
    mailTo: { type: String },
    mailFrom: { type: String },
    mailUsername: { type: String },
    mailPass: { type: String },
    mailSecure: { type: Boolean },
    signalUrl: { type: String },
    signalNumber: { type: String },
    signalRecipients: { type: String },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

NotificationSchema.methods.notify = function (event) {
  console.log(event)

  switch (this.type) {
    case 'slack':
      try {
        let data = {
          text: event.monitor.name + ': ' + event.type,
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: event.monitor.name + ': ' + event.type,
              },
            },
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: '*Message*\n' + event.message,
                },
                {
                  type: 'mrkdwn',
                  text: '*Time (UTC)*\n' + event.createdAt,
                },
              ],
            },
          ],
        }

        axios.post(this.config.slackWebhook, data)
        break
      } catch (error) {
        console.log(error)
      }

    default:
      break
  }
}

NotificationSchema.plugin(timestamps) // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Notification', NotificationSchema)
