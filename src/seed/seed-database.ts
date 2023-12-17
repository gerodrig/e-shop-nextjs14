import prisma from '../lib/prisma';
import { initialData } from './seed';
import {countries } from './seed-countries';

async function main() {
  //? STEP 1 - Delete all data from the database
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //? STEP 2 - Insert initial data into the database
  const { categories, products, users} = initialData;

  //insert users into the database
  await prisma.user.createMany({
    data: users,
  });

  //convert categories to an object with the category name as the key
  const categoriesData = categories.map((name) => ({ name }));

  //insert categories into the database
  await prisma.category.createMany({
    data: categoriesData,
  });

  //get all categories from the database to use in the products
  const allCategories = await prisma.category.findMany();

  const categoriesMap = allCategories.reduce((acc, category) => {
    acc[category.name.toLocaleLowerCase()] = category.id;
    return acc;
  }, {} as Record<string, string>);

  //convert products to an object with the product name as the key
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  //? STEP 3 - Insert countries into the database
  await prisma.country.createMany({
    data: countries,
  });


  console.log('Seed successfully completed');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
