'use server';

import prisma from "@/lib/prisma";

export const setTransactionId = async (orderId: string, transactionId: string) => {


    try {

        //update order with transaction id
        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                transactionId,
            },
        });

        if(!order) throw new Error('Order not found');

        return {
            ok: true,
            message: 'Transaction id set successfully',
        }
        
    } catch (error: any) {
        return {
            ok: false,
            message: error.message ?? 'Something went wrong',
        }
    }
};
