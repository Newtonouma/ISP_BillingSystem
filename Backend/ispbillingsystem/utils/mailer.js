// utils/mailer.js
import nodemailer from 'nodemailer';

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Or your mail service provider
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

// Send email with invoice attachment
export const sendInvoiceWithAttachment = (to, subject, text, attachmentBuffer, filename) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject,
        text,
        attachments: [
            {
                filename,
                content: attachmentBuffer,
            },
        ],
    };

    return transporter.sendMail(mailOptions);
};
