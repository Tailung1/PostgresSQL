import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
import EmailService from "../utils/emailService.js";
import { AppError } from "../utils/errorhandler.js";

async function getUsers(req, res) {
  try {
    const result = await prisma.users.findMany({
      include: {
        userProducts: {
          include: {
            product: true,
          },
        },
        userRole: { select: { name: true } },
      },
    });
    const flattenedResult = result.map((data) => ({
      ...data,
      userRole: data.userRole.name,
    }));
    res.status(200).json(flattenedResult);
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
async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
      include: { userRole: true },
    });
    if (!user) {
      return next(
        new AppError("No user found with the provided email", 400)
      );
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return next(new AppError("Password does not match", 400));
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
  } catch (err) {
    res
      .status(501)
      .send({ message: "Failed to sign in," }, err.message);
  }
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

    await prisma.sendEmail.deleteMany({
      where: { userId: user.id },
    });

    await prisma.sendEmail.create({
      data: { userId: user.id, otpCode, otpExpiry },
    });

    await EmailService(email, otpCode);

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

    const emailTable = await prisma.sendEmail.findFirst({
      where: { userId: user.id },
    });
    if (emailTable.attempts > 2) {
      await prisma.sendEmail.deleteMany({
        where: { userId: emailTable.userId },
      });
      return res.status(400).send({
        message:
          "You used already 3 tries to enter correct Code. Please send new Reuqest for new code",
      });
    }

    if (
      emailTable.otpCode !== otpCode ||
      new Date() > emailTable.otpExpiry
    ) {
      await prisma.sendEmail.update({
        where: { id: emailTable.id },
        data: { attempts: emailTable.attempts + 1 },
      });
      return res.status(400).send({ message: "Invalid otpCode" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.sendEmail.deleteMany({
      where: { userId: user.id },
    });
    res.json({ message: "Password reseted sucessfully" });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const uploadProfilePicture = async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: { id: parseInt(id) },
  });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  await prisma.users.update({
    where: { id: parseInt(id) },
    data: { profilePicture: req.file.path },
  });
  return res.json({
    message: "Profile picture uploaded successfully",
    profilePictureInfo: req.file,
  });
};

export {
  getUsers,
  createUser,
  updateUserInfo,
  deleteUser,
  getUser,
  signup,
  signin,
  uploadProfilePicture,
};
