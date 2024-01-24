import request from "supertest";
import { app } from "../../app";
import {Ticket} from "../../models/tickets"
import mongoose from "mongoose";

it('it returns a 404 if tickets is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const response = await request(app).post(`/api/tickets/${id}`).send().expect(404);
})

it('it returns a the ticket if found', async () => {
  
  const title = 'dasdsadas'
  const response = await request(app).post("/api/tickets").set('Cookie', global.signin()).send({
    title,
    price: 10
  }).expect(201);
  const ticketResponse = await request(app).post(`/api/tickets/${response.body.id}`).send().expect(200);
})
