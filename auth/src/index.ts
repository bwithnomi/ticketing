import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Jwt not defined')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }
  try {

    await mongoose.connect(process.env.MONGO_URI, {

    })
    console.log(`connected to mongoDb`);
  } catch (error) {
    console.log(error);
    
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
}

start();
