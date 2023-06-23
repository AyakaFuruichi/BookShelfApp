import mongoose from 'mongoose';


mongoose.set("strictQuery", true);

import env from 'dotenv';
env.config();

/**
 * mongoose setting
 */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('error', function (err) {
  console.error('connection error: ', err);
});

db.once('open', function () {
  console.log('Connected successfully');
});
