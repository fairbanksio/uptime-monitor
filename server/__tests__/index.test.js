const request = require('supertest')
const app = require('../app')

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})

describe('Verify the site loads', () => {
  test('Response should equal HTTP 200', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
        app.close()
      })
  })
})
