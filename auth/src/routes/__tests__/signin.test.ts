import request from "supertest";
import { app } from "../../app";

it('returns a 201 on successful login', async () => {
  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201)
  const response = await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(200)
  expect(response.get('Set-Cookie')).toBeDefined()
})

it('returns a 422 with an invalid credentials', async () => {
  return request(app).post('/api/users/signup').send({
    email: 'testtest.com',
    password: ''
  })
  .expect(422)
})

it('returns a 400 if email does not exists', async () => {
  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201)
  await request(app).post('/api/users/signin').send({
    email: 'test@test1.com',
    password: 'password'
  })
  .expect(400)
});

