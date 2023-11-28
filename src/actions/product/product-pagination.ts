'use server';

import prisma from '@/lib/prisma';
import {Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;

  if (page < 1) page = 1;

  try {

    //? 1.Get the products with the images from the database
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      //?Search if gender is provided
      where: {
        gender: gender
      }
    });

    //? 2. Calculate the number of pages
    const totalCount = await prisma.product.count({
      //? Count by gender if provided
      where: {
        gender: gender
      }
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map(({ url }) => url),
      })),
    };
  } catch (error) {
    throw new Error('Error getting products');
  }
};
