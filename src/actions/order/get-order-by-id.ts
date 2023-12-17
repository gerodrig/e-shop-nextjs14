'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (orderId: string) => {
  try {
    const session = await auth();

    if (!session) throw new Error('Unauthorized user must be authenticated');

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: {
          include: {
            product: {
                include: {
                    ProductImage: true,
                }
            }
          },
        },
        OrderAdress: {
          include: {
            country: {
              select: {
                name: true,
              }
            }
          },
        }
      },
    });

    if(session.user.role !== 'ADMIN' && session.user.id !== order?.userId) throw new Error('Unauthorized user');

    if(!order?.total) throw new Error('Order not found' );
    if(!order?.OrderAdress) throw new Error('Order address not found' );

    const productsInOrder = order?.OrderItem.map(({product, price, quantity, size}) => ({
        title: product.title,
        price,
        quantity,
        size,
        image: product.ProductImage[0].url,
        subtotal: price * quantity,
    }));

    const address = {
        firstName: order?.OrderAdress.firstName,
        lastName: order?.OrderAdress.lastName,
        address: order?.OrderAdress.address,
        postalCode: order?.OrderAdress.postalCode,
        city: order?.OrderAdress.city,
        country: order?.OrderAdress.country.name,
        phone: order?.OrderAdress.phone,
    }

    return {
      ok: true,
      orderSummary: {
        itemsInOrder: order?.itemsInOrder,
        subTotal: order?.subtotal ?? 0,
        tax: order?.tax ?? 0,
        total: order?.total ?? 0,

      },
      isOrderPaid: order?.isPaid ?? false,
      address,
      productsInOrder 
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message ?? 'Something went wrong',
    };
  }
};
