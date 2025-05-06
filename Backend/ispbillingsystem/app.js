import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';  // Ensure correct import
import invoiceRoutes from './routes/invoiceRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);  // Correct usage
app.use('/api/invoices', invoiceRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('DB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
});
