/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { QuantitySelector } from "@/components";
import { CartProduct } from '@/interfaces';
import { useCartStore } from "@/store";

interface Props {
    product: CartProduct;
    edit?: boolean;
}

export const CartItem = ({product, edit = true}: Props) => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProductFromCart = useCartStore((state) => state.removeProductFromCart);


  return (
    <div className="flex mb-5">
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
      <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
      {product.size} - {product.title}
      </Link>
      <p>{product.price}$ {!edit && product.quantity}</p>
      {
        edit ? 
        
        <QuantitySelector quantity={product.quantity} onQuantityChanged={ quantity => updateProductQuantity(product, quantity)} />
        : 
        <p className="font-bold">Subtotal: ${product.price * 3}</p>
      }
    <button onClick={() => removeProductFromCart(product)} className="underline mt-3 text-red-500">
      Remove
    </button>
    </div>
  </div>
  )
}
