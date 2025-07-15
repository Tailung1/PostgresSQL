import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      description: "Devices and gadgets",
    },
  });
  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      description: "Apparel and fashion",
    },
  });
  await prisma.products.createMany({
    data: [
      {
        name: "iPhone 15",
        price: 999.99,
        stock: 20,
        slug: "iphone-15",
        categoryID: electronics.id,
      },
      {
        name: "T-shirt",
        price: 779.99,
        stock: 15,
        slug: "t-shirt",
        categoryID: clothing.id,
      },
      {
        name: "Shoes",
        price: 59.99,
        stock: 5,
        slug: "shoes",
        categoryID: clothing.id,
      },
    ],
  });
  console.log("Sending completed");
}
main()
  .catch((e) => {
    console.error("Sending failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
