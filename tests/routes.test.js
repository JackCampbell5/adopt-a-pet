const request = require('supertest')
const app = require('../index')


describe('GET /pet', () => {
  it('should return a list of pets', async () => {
    const res = await request(app).get('/pet')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
  })
})
