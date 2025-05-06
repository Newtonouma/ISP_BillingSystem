// routes/invoiceRoutes.js
import express from 'express';
import * as invoiceController from '../controllers/invoiceController.js';

const router = express.Router();

// Define your routes here
router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.getAllInvoices);
router.get('/:id', invoiceController.getInvoiceById);
router.put('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);

export default router;
