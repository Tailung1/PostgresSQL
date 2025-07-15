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
  await prisma.products.createMany({
    data:[
        {
            name:"iPhone 15",
            price:999.99,
            stock:20,
            slug:"iphone-15",
            categoryID:electronics.id
        },
        {
            name:"Samsung Galaxy S24",
            price:779.99,
            stock:15,
            slug:"samsung galaxy s24",
            categoryID:electronics.id
        }
    ]
  })
}
