'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  try {
    if (!imageUrl.startsWith('http')) {
      throw new Error('Filesystem images cannot be deleted');
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    //? Revalidate paths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);
    
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};
