'use client';

import { useEffect, useState } from "react";
import { Loader } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from '../../../../utils/currencyFormat';

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);
    const { total, totalItems, tax, subTotal } = useCartStore((state) => state.getSummaryInformation());

    useEffect(() => {
        setLoaded(true);
    }, []);

    if(!loaded) {
        return (
            <Loader />
        )
    }

  return (
    <div className="grid grid-cols-2">
      <span>Number of Products</span>
      <span className="text-right">{totalItems} {totalItems > 1 ? 'items' : 'item'}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>GST (5%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
