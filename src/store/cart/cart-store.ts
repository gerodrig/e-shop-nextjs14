import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartProduct } from '@/interfaces';

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  getSummaryInformation: () => { subTotal: number; tax: number; total: number; totalItems: number; }

  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      //* Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();
        
        const subTotal = cart.reduce(
          (subTotal, item) => subTotal + (item.price * item.quantity),
          0
        );

        const tax = subTotal * 0.05;
        const total = subTotal + tax;
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          subTotal,
          tax,
          total,
          totalItems,
        };


      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        //? Check if product is already in cart
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //?2. If product is already in cart, update quantity
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCart });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: updatedCart });
      },
      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();

        const updatedCart = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCart });
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);
