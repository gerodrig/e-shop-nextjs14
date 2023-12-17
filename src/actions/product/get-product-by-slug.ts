'use server';

import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    //? 1.Get the products with the images from the database
    const product = await prisma.product.findUnique({
      include: {
        ProductImage: true,
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map(({ url }) => url),
    };
  } catch (error) {
    throw new Error('Error getting product by slug');
  }
};
