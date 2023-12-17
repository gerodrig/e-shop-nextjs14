'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Loader } from '@/components';
import { currencyFormat } from '@/utils/currencyFormat';

interface Props {
    productsInOrder: {
        title: string;
        price: number;
        quantity: number;
        size: string;
        image: string;
        subtotal: number;
    }[];
}

export const ProductsInOrder = ({productsInOrder}: Props) => {
  const [loaded, setLoaded] = useState(false);

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
      {productsInOrder.map((product) => {
        return (
          <div key={`${product.title}-${product.size}`} className="flex mb-5">
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
              <h3 className="text-xl">{product.title}</h3>
              <h2>Size: {product.size}</h2>
              <span>
                ${product.price} x {product.quantity}
              </span>
              <p className='font-bold'>{`Subtotal: ${currencyFormat(product.subtotal )}`} </p>

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
