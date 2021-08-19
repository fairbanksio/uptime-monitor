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

describe('Monitor can be created', () => {
  test('Response should contain monitor object plus an id', (done) => {
    request(app)
      .post('/api/monitors').send(monitor)
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
        done()
      })
  })
})
