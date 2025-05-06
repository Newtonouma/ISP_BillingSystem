// controllers/invoiceController.js
import Invoice from '../models/Invoice.js';
import Customer from '../models/Customer.js';
import PDFDocument from 'pdfkit';
import mailer from '../utils/mailer.js';
import streamBuffers from 'stream-buffers'; // for capturing PDF in memory

export const createInvoice = async (req, res) => {
    try {
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        const invoice = await Invoice.create({
            customerId: req.body.customerId,
            amount: req.body.amount,
            dueDate: req.body.dueDate,
            status: 'Pending'
        });

        // Generate PDF in memory
        const pdfBuffer = await generateInvoicePDFBuffer(invoice, customer);

        // Send email with PDF attachment
        await mailer.sendInvoiceWithAttachment(
            customer.email,
            'Your Invoice',
            'Your invoice is attached as a PDF.',
            pdfBuffer,
            `invoice-${invoice._id}.pdf`
        );

        res.status(201).json({ invoice, message: 'Invoice created and emailed with PDF!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create invoice.' });
    }
};

// Helper function to generate PDF as a buffer
const generateInvoicePDFBuffer = (invoice, customer) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = new streamBuffers.WritableStreamBuffer();

        doc.text(`Invoice #${invoice._id}`);
        doc.text(`Customer: ${customer.name}`);
        doc.text(`Amount: ${invoice.amount}`);
        doc.text(`Due: ${invoice.dueDate}`);
        doc.text(`Status: ${invoice.status}`);

        doc.end();
        doc.pipe(stream);

        stream.on('finish', () => {
            const buffer = stream.getBuffer();
            resolve(buffer);
        });

        stream.on('error', reject);
    });
};
