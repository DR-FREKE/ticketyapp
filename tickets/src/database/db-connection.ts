import { DatabaseConnectionError } from '@sntickety/common-lib';
import mongoose from 'mongoose';

export const dbConnector = async (): Promise<void> => {
  if (!process.env.MONGO_POD_URL_TICKETS) throw new Error('MONGO_POD_URL_TICKETS must be defined');

  const url = process.env.MONGO_POD_URL_TICKETS as string;
  try {
    await mongoose.connect(url);
    console.log('Connected to Database...');
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};
