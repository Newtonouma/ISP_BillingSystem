import express from 'express';
import * as customerController from '../controllers/customerController.js'; // Adjust the path based on your project structure

const router = express.Router();

// Route to get all customers
router.get('/', customerController.getCustomers);

// Route to create a new customer
router.post('/', customerController.createCustomer);

// Route to get a specific customer by ID
router.get('/:id', customerController.getCustomerById);

// Route to update customer details
router.put('/:id', customerController.updateCustomer);

// Route to delete a customer
router.delete('/:id', customerController.deleteCustomer);

export default router;
