import nodemailer from "nodemailer";

export default async (email, otpCode, req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP for password reset",
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7fa;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Password Reset Request</h2>
          </div>
          <p>Hello,</p>
          <p>You requested a password reset. Use the OTP below to proceed:</p>
          <div class="otp-code">${otpCode}</div>
          <p>This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>
          <div class="footer">
            <p>&copy; 2025 Your Company</p>
            <p><a href="https://yourcompany.com/help">Need Help?</a></p>
          </div>
        </div>
      </body>
    </html>
  `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};
