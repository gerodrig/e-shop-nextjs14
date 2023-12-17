'use client';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import type { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from '@paypal/paypal-js/';
import { paypalCheckPayment, setTransactionId } from '@/actions';

type Props = {
  orderId: string;
  amount: number;
}

const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
  
  const details = await actions.order?.capture();

  if(!details) return;

  const {ok} = await paypalCheckPayment(details.id);

  if(!ok){
    throw new Error('Something went wrong with your order. Please try again.');
  }
}

export const PayPalButton = ({orderId, amount}: Props) => {

  const [{isPending}] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className='h-11 bg-gray-300 rounded' />
        <div className='h-11 bg-gray-300 rounded mt-2' />
      </div>
    )
  }

  const createOrder= async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`
          }
        }
      ]
    });

    //? Save transactionId to database
    const {ok} = await setTransactionId(orderId, transactionId);

    if(!ok){
      throw new Error('Something went wrong with your order. Please try again.');
    }

    console.log('transactionId', transactionId, ok)

    return transactionId;
  };

  return (
    <div className='relative z-0'>
      <PayPalButtons 
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
