let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp')
const axios = require('axios')
const axiosRetry = require('axios-retry')
var encrypt = require('mongoose-encryption');
const settings = require('../config/settings')

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
    mailHost: { type: String },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

NotificationSchema.plugin(encrypt,{
    secret: settings.encryptionSecret,
    encryptedFields: ['config.mailPass','config.slackWebhook']
  });

NotificationSchema.methods.notify = function (event) {
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
      } catch (err) {
        console.log(err)
      }

    case 'email':
      try {
        let transporter = nodemailer.createTransport(smtpTransport({
          host: this.config.mailHost,
          auth: {
              user: this.config.mailUsername,
              pass: this.config.mailPass
          }
        }));

        const mailOptions = {
          from: this.config.mailFrom,
          to: this.config.mailTo,
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
