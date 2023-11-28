'use client';

import { useState } from 'react';
import { SizeSelector, QuantitySelector } from '@/components';
import { Product } from '@/interfaces';
import { Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { CartProduct } from '../../../../../interfaces/product.interface';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0]
    };
    //TODO: Add to cart
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  }

  return (
    <>
    {/* Error message in case size is not selected when clicking on Add to cart button */}
    <span className='mt-2 text-red-500 fade-in duration-300'>
      {posted && !size && 'Please select a size'}
    </span>
      {/* Size Selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Quantity Selector */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button Add to Cart */}
      <button onClick={addToCart} className="btn-primary my-5">Add to cart</button>
    </>
  );
};
