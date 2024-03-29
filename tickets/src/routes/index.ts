import express, { Request, Response } from "express";
import { NotFoundError, requireAuth, validateRequest } from '@bwntickets/common';
import { body } from "express-validator";
import { Ticket } from "../models/tickets";

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  return res.status(200).send(tickets);
});

export {router as indexTicketRouter}