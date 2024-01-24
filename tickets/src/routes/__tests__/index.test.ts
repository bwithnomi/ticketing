import request from "supertest";
import { app } from "../../app";
import {Ticket} from "../../models/tickets"
import mongoose from "mongoose";

const createTicket = async () => {

  const title = 'dasdsadas'
  return request(app).post("/api/tickets").set('Cookie', global.signin()).send({
    title,
    price: 10
  }).expect(201);
}

it('can fetch list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get(`/api/tickets`).send().expect(200);
  expect(response.body.length).toEqual(3)
})
