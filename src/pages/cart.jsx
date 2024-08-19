import React from "react";
import { useCartStore } from "@/store";
import {
  calculateTotal,
  calculateTax,
  calculateDiscount,
  calculatePromoDiscount,
  calculateShipping,
  calculateGrandTotal,
  calculateTotalBeforePromo,
} from "@/utils/utilityFunctions";

export default function Cart() {
  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);
  const [promoCode, setPromoCode] = React.useState("");
  const [enterPromoCode, setEnterPromoCode] = React.useState(false);
  const [isPromoCodeValid, setIsPromoCodeValid] = React.useState(false);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="lg:w-3/4">
            {cart.length > 0 ? (
              cart.map((product) => (
                <div key={product.id} className="flex flex-col mb-4">
                  {/* Product details */}
                  <div className="flex items-center">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                      <p className="text-sm text-gray-900">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-sm text-gray-900">
                        Price: ₹{product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-row justify-center py-10 w-full">
                <p className="text-lg font-medium text-gray-900">
                  Your cart is empty.
                </p>
              </div>
            )}
          </div>

          <div className="lg:w-1/4 lg:pl-8">
            <div className="border-t border-gray-200 py-6">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>₹{calculateTotal(cart)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Tax</p>
                  <p>₹{calculateTax(cart)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Discount</p>
                  <p>-₹{calculateDiscount(cart)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping</p>
                  <p>₹{calculateShipping(cart)}</p>
                </div>
                {promoCode && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Promo Discount</p>
                    <p>-₹{calculatePromoDiscount(cart, promoCode)}</p>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-900 font-medium">
                  <p>Total</p>
                  <p>₹{calculateGrandTotal(cart, promoCode)}</p>
                </div>
              </div>
              <div className="mt-6">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code"
                  className="w-full border border-gray-300 px-4 py-2"
                />
                <button
                  onClick={() => setEnterPromoCode(true)}
                  className="mt-2 w-full bg-gray-900 text-white px-4 py-2"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
