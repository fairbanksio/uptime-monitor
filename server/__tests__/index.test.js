const request = require('supertest')
const app = require('../app')

describe('Verify the site loads', () => {
  test('Response should equal HTTP 200', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})
