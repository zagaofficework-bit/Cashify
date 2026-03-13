const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Phonify" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(email, firstname, otp) {
  const subject = "Welcome to Phonify 🎉";

  const text = `Hello ${firstname},
Your OTP is ${otp}.
Thanks for joining Phonify.`;

  const html = `
    <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:40px 0;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
            
            <div style="background:#4f46e5; padding:20px; text-align:center; color:white;">
                <h2 style="margin:0;">Welcome to Phonify 🚀</h2>
            </div>

            <div style="padding:30px; text-align:center;">
                <h3 style="color:#333;">Hello ${firstname},</h3>
                <p style="color:#555; font-size:15px;">
                    Thank you for registering with <b>Phonify</b>.  
                    Use the OTP below to verify your account.
                </p>

                <div style="margin:25px 0;">
                    <span style="
                        display:inline-block;
                        background:#4f46e5;
                        color:white;
                        font-size:26px;
                        letter-spacing:6px;
                        padding:12px 25px;
                        border-radius:8px;
                        font-weight:bold;
                    ">
                        ${otp}
                    </span>
                </div>

                <p style="color:#777; font-size:14px;">
                    This OTP is valid for a limited time.  
                    Please do not share it with anyone.
                </p>
            </div>

            <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:13px; color:#666;">
                © ${new Date().getFullYear()} Phonify • All Rights Reserved
            </div>

        </div>
    </div>
    `;

  await sendEmail(email, subject, text, html);
}

async function sendLoginEmail(email, otp) {
  const subject = "Phonify Login Verification 🔐";

  const text = `Your login OTP is ${otp}`;

  const html = `
    <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:40px 0;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

            <div style="background:#10b981; padding:20px; text-align:center; color:white;">
                <h2 style="margin:0;">Login Verification</h2>
            </div>

            <div style="padding:30px; text-align:center;">
                <p style="color:#555; font-size:15px;">
                    Use the OTP below to securely login to your account.
                </p>

                <div style="margin:25px 0;">
                    <span style="
                        display:inline-block;
                        background:#10b981;
                        color:white;
                        font-size:26px;
                        letter-spacing:6px;
                        padding:12px 25px;
                        border-radius:8px;
                        font-weight:bold;
                    ">
                        ${otp}
                    </span>
                </div>

                <p style="color:#777; font-size:14px;">
                    If you didn't request this login, please ignore this email.
                </p>
            </div>

            <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:13px; color:#666;">
                © ${new Date().getFullYear()} Phonify • Secure Login
            </div>

        </div>
    </div>
    `;

  await sendEmail(email, subject, text, html);
}

async function sendTransactionEmail(email, firstname, amount, toAccount) {
  const subject = "Transaction Successful!";
  const text = `Hello ${firstname},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${firstname},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(email, subject, text, html);
}

async function sendTransactionFailureEmail(
  email,
  firstname,
  amount,
  toAccount,
) {
  const subject = "Transaction Failed";
  const text = `Hello ${firstname},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${firstname},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(email, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
  sendLoginEmail,
};
