

type Props = {
  itemsInOrder: number;
  subTotal: number;
  tax: number;
  total: number;
};

export const OrderSummary = ({ itemsInOrder, subTotal, tax, total  }: Props) => {


  return (
    <div className="grid grid-cols-2">
      <span>Number of Products</span>
      <span className="text-right">{itemsInOrder} Items</span>

      <span>Subtotal</span>
      <span className="text-right">$ {subTotal}</span>

      <span>GST (5%)</span>
      <span className="text-right">$ {tax}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">$ {total}</span>
    </div>
  );
};
