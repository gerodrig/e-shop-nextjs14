'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedOrders = async () => {
  try {
    const session = await auth();
    if (session?.user.role !== 'admin'){
      //navigate to home page
      throw new Error('Unauthorized user must be authenticated');

    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',                                                                                       
      },
      include: {
        OrderAdress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!orders) throw new Error('Orders not found');

    return {
      ok: true,
      orders,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
