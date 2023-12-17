'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { useAddressStore, useCartStore } from '@/store';
import { placeOrder } from '@/actions';

import { Loader } from '@/components';
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);  
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const { totalItems, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.size,
    }));
    console.log(address, productsToOrder);

    //? Create order with server action
    const response = await placeOrder(productsToOrder, address);
    
    if(!response.ok){
      setIsPlacingOrder(false);
      setErrorMessage(response?.message || 'Something went wrong');
      return;
    }

    //? Clear cart
    clearCart();

    console.log(response.order?.id);

    //? Navigate to order page
    router.replace(`/orders/${response.order?.id}`);
    
  };

  if (!loaded) {
    return <Loader />;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Delivery Address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order Summary</h2>
      <div className="grid grid-cols-2">
        <span>Number of Products</span>
        <span className="text-right">
          {totalItems} {totalItems > 1 ? 'items' : 'item'}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>GST (5%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        <p className="text-sm text-gray-500 mb-5">
          By submitting this order, you agree to our privacy policy and terms
          and conditions.
        </p>

        <button
          className={clsx('flex justify-center', {
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          // href="/orders/123"
        >
          Submit Order
        </button>
        <p className="text-red-500 mt-2">{errorMessage}</p>
      </div>
    </div>
  );
};
