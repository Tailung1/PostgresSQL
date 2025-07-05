import { json } from "express";

export async function getUser(req, res) {
  try {
    const result = await prisma.users.findMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function createUser(req, res) {
  const { firstName, lastName, email } = req.body();
  try {
    const newUser = await prisma.users.create({
      data: { firstName, lastName, email },
    });
    res.json(newUser);
  } catch (err) {
    res.staus(404).json({ message: err.message });
  }
}

export { getUser, createUser };
