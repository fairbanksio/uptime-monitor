const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

require('dotenv').config({ path: '.env.sample' }) // eslint-disable-line

afterAll(() => mongoose.disconnect())

// Test API is running
describe('Verify the site loads', () => {
  test('Response should equal HTTP 200', (done) => {
    request(app)
      .get('/api')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

// Test auth
const user = {
  username: "testUser",
  password: "testPassword"
};

describe('User can register', () => {
  test('Response should contain the user', (done) => {
    request(app)
      .post('/api/auth/register').send(user)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          username: "testUser",
          password: expect.any(String)
        })
        done()
      })
  })
})

let authToken = "jwt "

describe('User can authenticate', () => {
  test('Response should contain token and username', (done) => {
    request(app)
      .post('/api/auth/login').send(user)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          username: "testUser",
          token: expect.any(String)
        })
        authToken = authToken + response.body.token
        done()
      })
  })
})

// Test Monitors
const monitor = {
  name: "test-monitor",
  enabled: true,
  interval: 60,
  type: "http",
  config: {
    httpUrl: "https://www.google.com"
  }
};

let monitorId = ""
describe('Monitor can be created', () => {
  test('Response should contain monitor object plus an id', (done) => {
    request(app)
      .post('/api/monitors').set('Authorization', authToken).send(monitor)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          name: "test-monitor",
          enabled: true,
          interval: 60,
          type: "http",
          config: {
            httpUrl: "https://www.google.com"
          }
        })
        monitorId = response.body._id
        done()
      })
  })
})

// Test Notification
const notification = {
  name: "slack-notification",
  type: "slack",
  config: {
    slackWebhook: "https://hooks.slack.com/services/xxxxxxxxx/xxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxx"
  }
};

let notificationId = ""
describe('Notification can be created', () => {
  test('Response should contain notification object plus an id', (done) => {
    request(app)
      .post('/api/notifications').set('Authorization', authToken).send(notification)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          name: "slack-notification",
          type: "slack",
          config: {
            slackWebhook: "https://hooks.slack.com/services/xxxxxxxxx/xxxxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxx"
          }
        })
        notificationId = response.body._id
        done()  
      })
  })
})

// Test Updating monitor
const monitorUpdate = {
  notifications: [notificationId]
};

describe('Notification can be added to monitor', () => {
  test('Response should contain monitor object with notification array', (done) => {
    request(app)
      .post('/api/monitors').set('Authorization', authToken).send(monitorUpdate)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          _id: expect.any(String),
          name: "test-monitor",
          enabled: true,
          interval: 60,
          type: "http",
          config: {
            httpUrl: "https://www.google.com"
          },
          notifications: expect.arrayContaining(notificationId)
        })
        done()
      })
  })
})
