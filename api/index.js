// api/index.js
import express from 'express';
import mongoose from 'mongoose';
import UserRoute from './userRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', UserRoute);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
