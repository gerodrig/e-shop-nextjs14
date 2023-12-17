'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { useCartStore } from '@/store';
import { Loader } from '@/components';
import Link from 'next/link';
import { QuantitySelector } from '@/components';

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
    setLoaded(true);
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
            <Image
              src={`/products/${product.image}`}
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
              <Link
                href={`/product/${product.slug}`}
                className="hover:underline cursor-pointer"
              >
                {product.size} - {product.title}
              </Link>
              <p>{product.price} </p>
              
                <QuantitySelector
                  quantity={product.quantity}
                  onQuantityChanged={(quantity) =>
                    updateProductQuantity(product, quantity)
                  }
                />

              <button
                onClick={() => removeProductFromCart(product)}
                className="underline mt-3 text-red-500"
              >
                Remove
              </button>
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
