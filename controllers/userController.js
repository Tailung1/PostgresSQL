import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const user = await prisma.users.findUnique({ where: { email } });
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(500).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  delete user.password
  res.json({ token,user });
}

export {
  getUsers,
  createUser,
  updateUserInfo,
  deleteUser,
  getUser,
  signup,
  signin,
};
