// controllers/invoiceController.js
import Invoice from '../models/Invoice.js';
import Customer from '../models/Customer.js';
import PDFDocument from 'pdfkit';
import { sendInvoiceWithAttachment } from '../utils/mailer.js';  // Ensure this is correctly imported
import streamBuffers from 'stream-buffers';

// Create Invoice
export const createInvoice = async (req, res) => {
  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const invoice = await Invoice.create({
      customerId: req.body.customerId,
      amount: req.body.amount,
      dueDate: req.body.dueDate,
      status: 'Pending',
    });

    const pdfBuffer = await generateInvoicePDFBuffer(invoice, customer);

    await sendInvoiceWithAttachment(
      customer.email,
      'Your Invoice',
      'Your invoice is attached as a PDF.',
      pdfBuffer,
      `invoice-${invoice._id}.pdf`
    );

    res.status(201).json({ invoice, message: 'Invoice created and emailed with PDF!' });
  } catch (err) {
    console.error('Error creating invoice:', err);
    res.status(500).json({ error: 'Failed to create invoice.', details: err.message });
  }
};

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (err) {
    console.error('Error fetching invoices:', err);
    res.status(500).json({ error: 'Failed to fetch invoices.' });
  }
};

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (err) {
    console.error('Error fetching invoice:', err);
    res.status(500).json({ error: 'Failed to fetch invoice.' });
  }
};

// Update invoice
export const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(updatedInvoice);
  } catch (err) {
    console.error('Error updating invoice:', err);
    res.status(500).json({ error: 'Failed to update invoice.' });
  }
};

// Delete invoice
export const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    console.error('Error deleting invoice:', err);
    res.status(500).json({ error: 'Failed to delete invoice.' });
  }
};

// Helper function to generate PDF as a buffer
const generateInvoicePDFBuffer = (invoice, customer) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = new streamBuffers.WritableStreamBuffer();

    doc.text(`Invoice #${invoice._id}`);
    doc.text(`Customer: ${customer.name}`);
    doc.text(`Amount: $${invoice.amount.toFixed(2)}`);
    doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`);
    doc.text(`Status: ${invoice.status}`);

    doc.end();
    doc.pipe(stream);

    stream.on('finish', () => {
      const buffer = stream.getBuffer();
      resolve(buffer);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
};
