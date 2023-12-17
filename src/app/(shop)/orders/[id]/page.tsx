// import { initialData } from '@/seed/seed';

import { redirect } from 'next/navigation';
import { getOrderById } from '@/actions';
import { Title, PaymentStatus } from '@/components';
import { ProductsInOrder } from './ui/ProductsInOrder';
import { DeliveryAddress } from './ui/DeliveryAddress';
import { OrderSummary } from './ui/OrderSummary';
import { PayPalButton } from '@/components/paypal/PayPalButton';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersById({ params }: Props) {
  const { id } = params;

  //TODO: Call server action to get order by id
  const { address, productsInOrder, orderSummary, ok, isOrderPaid } =
    await getOrderById(id);

  //TODO: Verify
  if (!ok) {
    redirect('/');
  }
  //redirect() if no id

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split('-').at(-1)}`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            {/* Payment Status */}
            <PaymentStatus isPaid={isOrderPaid!} />

            {productsInOrder && (
              <ProductsInOrder productsInOrder={productsInOrder} />
            )}
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery Address</h2>
            {address && <DeliveryAddress {...address} />}

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>

            {orderSummary && <OrderSummary {...orderSummary} />}
            <div className="mt-5 mb-2 w-full">
              {isOrderPaid ? (
                <PaymentStatus isPaid={isOrderPaid!} />
              ) : (
                <PayPalButton orderId={id} amount={orderSummary?.total!} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
