'use server';

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";

const verifyPayment = async (payPalTransactionId: string): Promise<PayPalOrderStatusResponse | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET;
    const paypalOrdersUrl = process.env.PAYPAL_ORDERS_URL + payPalTransactionId;

  
    const base64Token = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
      'utf-8'
    ).toString('base64');
  
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Basic ${base64Token}`);
  
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect,
    };
  
    try {
        console.log({paypalOrdersUrl});
      const response = fetch(paypalOrdersUrl, {
        ...requestOptions,
        cache: 'no-store',
      })
        .then((response) => response.json()).then((data) => {
            console.log({data});
            return data;
            });
  
        return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  try {

    const response = await verifyPayment(paypalTransactionId);

    if(!response) throw new Error('Something went wrong');

    // if(response.status !== 'COMPLETED') throw new Error('Payment not completed');
    const {status, purchase_units} = response;

    if(status !== 'COMPLETED') throw new Error('Payment not completed');

    //? get invoice id from purchase_units and update order with invoice id

    const {invoice_id: orderId} = purchase_units[0];

    await prisma.order.update({
        where: { id: orderId},
        data: {
            isPaid: true,
            paidAt: new Date(),
        }
    });

    //? revalidate path
    revalidatePath(`/orders/${orderId}`);


    return {
      ok: true,
    };

  } catch (error: any) {
    return {
      ok: false,
      message: error.message ?? 'Something went wrong',
    };
  }
};

