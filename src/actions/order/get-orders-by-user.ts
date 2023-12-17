'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async () => {
  try {
    const session = await auth();
    if (!session?.user)
      throw new Error('Unauthorized user must be authenticated');

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
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
