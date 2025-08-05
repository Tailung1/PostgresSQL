import { PrismaClient } from "@prisma/client";
import { empty } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

async function getUsers(req, res) {
  try {
    const result = await prisma.users.findMany({
      include: { userProducts: { include: { product: true } } },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      res.json({ messgae: "User not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
}

async function createUser(req, res) {
  const { firstName, lastName, email } = req.body;
  try {
    const newUser = await prisma.users.create({
      data: { firstName, lastName, email },
    });
    res.json(newUser);
  } catch (err) {
    res.staus(404).json({ message: err.message });
  }
}

async function updateUserInfo(req, res) {
  const { firstName, lastName, email } = req.body;
  const { id } = req.params;
  try {
    const updated = await prisma.users.update({
      where: { id: parseInt(id) },
      data: { firstName, lastName, email },
    });
    if (!updated) {
      res.json({ message: "Product not found" });
    } else {
      res.json(updated);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.users.delete({
      where: { id: parseInt(id) },
    });
    if (!deletedUser) {
      res.json({ message: "User not found" });
    } else {
      res.json({
        message: "Product deleted successfully",
        deletedUser: deletedUser,
      });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
}

async function signup(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.users.create({
      data: { firstName, lastName, email, password: hashedPassword },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to signup" });
  }
}
async function signin(req, res) {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({
    where: { email },
    include: { userRole: true },
  });
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(500).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user.id, role: user.userRole.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  delete user.password;
  res.json({ token, user });
}
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    const otpCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await prisma.users.update({
      where: { id: user.id },
      data: { otpCode, otpExpiry },
    });

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

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, otpCode, newPassword } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.otpCode !== otpCode || new Date() > user.otpExpiry) {
      return res.status(400).send({ message: "Invalid otpCode" });
    }
    const newPass = await bcrypt.hash(newPassword, 10);
    await prisma.users.update({
      where: { id: user.id },
      data: { password: newPass },
    });
    res.json({ message: "Password reseted sucessfully" });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

export {
  getUsers,
  createUser,
  updateUserInfo,
  deleteUser,
  getUser,
  signup,
  signin,
};
