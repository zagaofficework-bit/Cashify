const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


async function sendRegistrationEmail(email, firstname,otp) {
    const subject = 'Welcome to Backend Ledger!';
    const text = `Hello ${firstname},\n\nThank you for registering at Backend Ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `<p>Hello ${firstname},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Your OTP is: ${otp}</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(email, subject, text, html);
}

async function sendLoginEmail(email,otp) {
    const subject = 'Welcome to Backend Ledger!';
    const text = `Hello\n\nThank you for registering at Backend Ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `<p>Hello</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Your OTP is: ${otp}</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(email, subject, text, html);
}

async function sendTransactionEmail(email, firstname, amount, toAccount) {
    const subject = 'Transaction Successful!';
    const text = `Hello ${firstname},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `<p>Hello ${firstname},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(email, subject, text, html);
}

async function sendTransactionFailureEmail(email, firstname, amount, toAccount) {
    const subject = 'Transaction Failed';
    const text = `Hello ${firstname},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `<p>Hello ${firstname},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(email, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail,
    sendLoginEmail
};