import mongoose from 'mongoose';
//import config from 'config';
import dbConfig from './default.json';

const db = dbConfig.mongoURI;

let cachedDb = null;

export function connectDB() {
  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }
  return connectToDB();
}

async function connectToDB() {
  try {
    cachedDb = await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
