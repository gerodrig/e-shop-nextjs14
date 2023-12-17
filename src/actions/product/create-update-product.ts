'use server';

import { revalidatePath } from 'next/cache';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((result) => result.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }

  const product = productParsed.data;
  product.slug = product.title.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...productData } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = productData.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase());
      if (id) {
        //? Update product
        product = await prisma.product.update({
          where: { id },
          data: {
            ...productData,
            sizes: { set: productData.sizes as Size[] },
            tags: { set: tagsArray },
          },
        });
      } else {
        //? Create product
        product = await prisma.product.create({
          data: {
            ...productData,
            sizes: { set: productData.sizes as Size[] },
            tags: { set: tagsArray },
          },
        });
      }

      //? Load the images
      //? check all the images and save them
      if (formData.has('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);

        if (!images) {
          throw new Error('Error uploading images, rolling back transaction');
        }

        //? Update database with images url
        await prisma.productImage.createMany({
          data: images.map((url) => ({
            url: url!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    //TODO: if everything is ok, revalidate the path
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error creating product',
    };
  }
};
