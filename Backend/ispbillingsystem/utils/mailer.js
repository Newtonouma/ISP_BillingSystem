const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
});

const sendInvoiceWithAttachment = async (to, subject, text, attachmentBuffer, filename) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text,
        attachments: [
            {
                filename: filename,
                content: attachmentBuffer
            }
        ]
    };
    await transporter.sendMail(mailOptions);
};

module.exports = { sendInvoiceWithAttachment };
