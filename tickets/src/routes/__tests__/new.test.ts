import request from "supertest";
import { app } from "../../app";
import {Ticket} from "../../models/tickets"

it('has a route handler to listening to /api/tickets for post request', async () => {
  const response = await request(app).post('/api/tickets').send({});
  console.log(response.status);
  
  expect(response.status).not.toEqual(404);
})

it('can only be accessed if user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({}).expect(401);
  
})

it('it returns a status other than 401 if user is signed in', async () => {
  const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({});
  console.log(response.status);
  
  expect(response.status).not.toEqual(401);
})

it('returns an error if invalid title is provided', async () => {
  await request(app).post("/api/tickets").set('Cookie', global.signin()).send({
    title: '',
    price: 10
  }).expect(422);
  await request(app).post("/api/tickets").set('Cookie', global.signin()).send({
    price: 10
  }).expect(422);
})

it('returns an error if invalid price is provided', async () => {
  await request(app).post("/api/tickets").set('Cookie', global.signin()).send({
    title: 'dasdsadas',
    price: -10
  }).expect(422);
  await request(app).post("/api/tickets").set('Cookie', global.signin()).send({
    title: '',
  }).expect(422);
})

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({})

  expect(tickets.length).toEqual(0)

  const title = 'dasdsadas'
  await request(app).post("/api/tickets").set('Cookie', global.signin()).send({
    title,
    price: 10
  }).expect(201);
  tickets = await Ticket.find({})

  expect(tickets.length).toEqual(1)
  expect(tickets[0].price).toEqual(10)
  expect(tickets[0].title).toEqual(title)
})
