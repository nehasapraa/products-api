const app = require('../server/app')
const supertest = require('supertest')
const request = supertest(app)
describe('Test the Endpoints', () => {
  it('testing products endpoint', async done => {
    const res = await request.get('/products')
    expect(res.status).toBe(200)
    done()
  })
  it('testing shopping history endpoint', async done => {
    const res = await request.get('/shopping')
    expect(res.status).toBe(200)
    done()
  })
  it('testing user endpoint', async done => {
    const res = await request.get('/user')
    expect(res.status).toBe(200)
    done()
  })
})