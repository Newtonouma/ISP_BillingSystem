import nodemailer from 'nodemailer';  // Import nodemailer for sending emails
// Create transporter using Gmail's SMTP service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,  // Use environment variables for email
        pass: process.env.EMAIL_PASS  // Use environment variables for password
    }
});

// Function to send invoice with attachment
const sendInvoiceWithAttachment = async (to, subject, text, attachmentBuffer, filename) => {
    const mailOptions = {
        from: process.env.EMAIL,  // Sender address
        to,                       // Recipient address
        subject,                  // Subject line
        text,                     // Plain text body
        attachments: [
            {
                filename: filename,  // Filename for the attachment
                content: attachmentBuffer  // The actual content of the attachment (buffer)
            }
        ]
    };

    // Send the email and wait for the result
    await transporter.sendMail(mailOptions);
};

// Export the function for use in other files
module.exports = { sendInvoiceWithAttachment };
