'use client';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

import { CartItem, Loader } from '@/components';
import { useCartStore } from '@/store';

export const ProductsInCart = () => {

  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);  
  
  useEffect(() => {
    setLoaded(true);
    if(productsInCart.length === 0){
      //navigate to /empty
      redirect('/empty');
    }
  },[productsInCart.length]);

  if (!loaded) {
    return (
      //Add loading spinner and loading text
      <Loader />

    );
  }

  return (
    <>
      {/* Items in local storage */}
      {productsInCart.map((product) => {
        return <CartItem key={`${product.slug}-${product.size}`} product={product} />;
      })}
    </>
  );
};
