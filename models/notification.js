let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp')
const axios = require('axios')
const axiosRetry = require('axios-retry')

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

axiosRetry(axios, { retries: 1 })

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
    mailHost: { type: Boolean },
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

    case 'email':
      try {
        let transporter = nodemailer.createTransport(smtpTransport({
          host: this.config.emailHost,
          auth: {
              user: this.config.emailUsername,
              pass: this.config.emailPassword
          }
        }));

        const mailOptions = {
          from: this.config.emailFrom,
          to: this.config.emailTo,
          subject: event.monitor.name + ': ' + event.type,
          html: '<p>' + event.message + '</p>'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
        });

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
