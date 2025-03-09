const request = require('supertest')

const { app, server } = require('./express_crud.v12')

afterAll(() => {
    server.close()
})

it('should return burrito with the budget range 1-100', async () => {
    const response = await request(app).put('/comida').send({budget: 25})
    expect(response.status).toBe(202)
    expect(response.body).toEqual({"advice": "come un burrito"})
})