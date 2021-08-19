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
        console.log(response)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          username: "testUser",
          position: expect.any(String)
        })
        done()
      })
  })
})
