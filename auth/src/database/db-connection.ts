import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@sntickety/common-lib';

export const dbConnector = async (): Promise<void> => {
  const url = String(process.env.MONGO_ATLAS_URL_2);
  try {
    await mongoose.connect(url); // auth is the actual db name that will be created in the pod
    console.log('connected to db...');
    console.log(url);
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

/**
 * please note mongoose below version 6 should include an object as second arguement that looks like:
 * {
 *  useNewUrlParser: true,
 *  useUnifiedTopology: true,
 *  useCreateIndex: true
 * }
 */
