import express, { Request, Response } from "express";
import { NotFoundError, requireAuth, validateRequest } from '@bwntickets/common';
import { body } from "express-validator";
import { Ticket } from "../models/tickets";

const router = express.Router();

router.post('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError()
  }
  return res.status(200).send(ticket);
});

export {router as showTicketRouter}