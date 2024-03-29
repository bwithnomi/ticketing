import { NextFunction, Response, Request } from 'express';
import express from 'express';
import "express-async-errors"
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { User } from './models/user';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler,NotFoundError } from '@bwntickets/common';
import cookieSession from 'cookie-session';

const app = express();
app.use(json());
app.set('trust proxy', true)
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test",
}))
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError())
});
app.use(errorHandler)

export {app}
