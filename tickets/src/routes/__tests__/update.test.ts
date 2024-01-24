import request from "supertest";
import { app } from "../../app";
import {Ticket} from "../../models/tickets"
import mongoose from "mongoose";

it('returns a 404 if tickets is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const response = await request(app).put(`/api/tickets/${id}`).set('Cookie', global.signin()).send({
    title: 'das',
    price: 10
  }).expect(404);
})

it('returns a 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const title = 'dasdas'
  const response = await request(app).put(`/api/tickets/${id}`).send({
    title,
    price: 10
  }).expect(401);
})

it('returns a 401 if user does not own the ticket', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = 'dasdas'
  const response = await request(app).post("/api/tickets").set('Cookie', global.signin()).send({
    title,
    price: 10
  });
  const rresponse = await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', global.signin()).send({
    title,
    price: 10
  }).expect(401);
})

it('returns a 400 if user provides invalid title and price', async () => {
  const cookie = global.signin();
  const title = 'dasdas'
  const response = await request(app).post("/api/tickets").set('Cookie', cookie).send({
    title,
    price: 10
  });
  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
    title: '',
    price: 10
  }).expect(422);
  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
    title: 'das',
    price: null
  }).expect(422);
})

it('updated the ticket provided valid inputs', async () => {
  
  const cookie = global.signin();
  const title = 'dasdsadas'
  const response = await request(app).post("/api/tickets").set('Cookie', cookie).send({
    title,
    price: 10
  }).expect(201);
  const ticketResponse = await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
    title,
    price: 10
  }).expect(200);
})
