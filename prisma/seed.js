import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      description: "Devices and gadges",
    },
  });
  const clothing = await prisma.products.create({
    data: {
      name: "Clothing",
      descirption: "Apparel and fashion",
    },
  });
}
