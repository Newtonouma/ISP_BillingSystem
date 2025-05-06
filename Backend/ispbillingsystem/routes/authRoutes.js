import express from 'express';
import * as customerController from '../controllers/customerController.js';

const router = express.Router();

// Define your routes
router.get('/', customerController.getCustomers);
router.post('/', customerController.createCustomer);

export default router;  // Export the router as default
