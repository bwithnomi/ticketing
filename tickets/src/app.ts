import { NextFunction, Response, Request } from 'express';
import express from 'express';
import "express-async-errors"
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { errorHandler,NotFoundError, currentUser } from '@bwntickets/common';
import cookieSession from 'cookie-session';
import {createTicketRouter} from "./routes/new";
import {showTicketRouter} from "./routes/show";
import {indexTicketRouter} from "./routes/index";
import {updateTicketRouter} from "./routes/update";

const app = express();
app.use(json());
app.set('trust proxy', true)
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test",
}))
app.use(currentUser);
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError())
});
app.use(errorHandler)

export {app}
