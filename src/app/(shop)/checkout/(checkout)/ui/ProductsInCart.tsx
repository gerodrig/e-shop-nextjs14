'use client';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

import { useCartStore } from '@/store';
import { Loader, ProductImage } from '@/components';
import { currencyFormat } from '@/utils/currencyFormat';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  useEffect(() => {
    setLoaded(true)
  }, []);

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
        return (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <ProductImage
              src={product.image}
              width={100}
              height={100}
              alt={product.title}
              className="mr-5 rounded"
              style={{
                width: '100px',
                height: '100px',
              }}
            />
            <div>
              <span
                className="hover:underline"
              >
                {product.size} - {product.title} ({product.quantity})
              </span>
              <p className='font-bold'>{currencyFormat(product.price * product.quantity )} </p>

            </div>
          </div>
        );
        // <>
        //   <h1>{product.title}</h1>
        // </>
      })}
    </>
  );
};
