const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

require('dotenv').config({ path: '.env.sample' }) // eslint-disable-line

afterAll(() => mongoose.disconnect())

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
          username: "testUser",
          token: expect.any(String)
        })
        done()
      })
  })
})

