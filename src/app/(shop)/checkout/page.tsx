import { initialData } from "@/seed/seed"
import { Title } from "@/components";
import Link from "next/link";
import { CartItem } from '@/components/cart/CartItem';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Review Order" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Cart */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Add more Items</span>
              <Link href="/cart" className="underline mb-5">
                Edit Cart
              </Link>

          {/* Items in local storage */}
            {
              productsInCart.map((product, index) => {
                const newProduct = {...product, id: `${index}`}
               return <CartItem key={product.slug} product={newProduct} edit={false}/>
              }
              )
            }
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Delivery Address</h2>
            <div className="mb-10">
              <p className="text-xl">Benito Martinez</p>
              <p>123 Main Street</p>
              <p>Montreal, QC</p>
              <p>H3Z 2Y7</p>
              <p>Canada</p>
              <p>514-123-4567</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"  />

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>Number of Products</span>
              <span className='text-right'>3 Items</span>

              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>
              
              <span>GST (5%)</span>
              <span className='text-right'>$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">

              {/* Disclaimer */}
              <p className="text-sm text-gray-500 mb-5">
                By submitting this order, you agree to our privacy policy and
                terms and conditions.
              </p>

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Submit Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}