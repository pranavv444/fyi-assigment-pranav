import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useCartStore } from "@/store";
import Image from "next/image";
import toast from "react-hot-toast";
import EmptyCart from "../../public/png/empty-cart.png";
import {
  calculateDiscount,
  calculateGrandTotal,
  calculatePromoDiscount,
  calculateShipping,
  calculateTax,
  calculateTotal,
  calculateTotalBeforePromo,
} from "@/utils/utilityFunctions";
import Link from "next/link";
import Router from "next/router";

export default function Cart() {
  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);
  const [promoCode, setPromoCode] = React.useState("");
  const [enterPromoCode, setEnterPromoCode] = React.useState(false);
  const [isPromoCodeValid, setIsPromoCodeValid] = React.useState(false);

  return (
    <div className="bg-gray-50 font-Lato">
      <div className="mx-auto max-w-6xl py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        {cart?.length !== 0 ? (
          <form className="mt-12 flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-3/4">
              <h2 className="sr-only">Items in your shopping cart</h2>

              <ul role="list" className="space-y-6">
                {cart.map((product, productIdx) => (
                  <li
                    key={product.id}
                    className="bg-white rounded-lg shadow p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-24 w-24 rounded-lg object-cover object-center"
                        width={96}
                        height={96}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-medium text-gray-700">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                            {product.size && (
                              <p className="mt-1 text-sm text-gray-500">
                                Size: {product.size}
                              </p>
                            )}
                          </div>
                          <p className="text-lg font-medium text-gray-900">
                            ₹
                            {parseFloat(product.price) *
                              parseFloat(product.quantity)}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                              onClick={() => {
                                if (product?.quantity === 10) {
                                  toast.error("Maximum quantity is 10");
                                  return;
                                }
                                setCart(
                                  [
                                    ...cart.filter(
                                      (item) => item.id !== product.id
                                    ),
                                    {
                                      ...product,
                                      quantity: product?.quantity + 1,
                                    },
                                  ].sort((a, b) => a.id - b.id)
                                );
                              }}
                            >
                              <PlusIcon className="h-5 w-5 text-gray-700" />
                            </button>
                            <div className="bg-gray-100 rounded-md px-4 py-1">
                              {product.quantity}
                            </div>
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                              onClick={() => {
                                if (product?.quantity === 1) {
                                  toast.error("Minimum quantity is 1");
                                  return;
                                }
                                setCart(
                                  [
                                    ...cart.filter(
                                      (item) => item.id !== product.id
                                    ),
                                    {
                                      ...product,
                                      quantity: product?.quantity - 1,
                                    },
                                  ].sort((a, b) => a.id - b.id)
                                );
                              }}
                            >
                              <MinusIcon className="h-5 w-5 text-gray-700" />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="ml-auto p-2 rounded-full bg-red-100 hover:bg-red-200"
                            onClick={() =>
                              setCart(
                                cart.filter((item) => item.id !== product.id)
                              )
                            }
                          >
                            <TrashIcon className="h-6 w-6 text-red-600" />
                          </button>
                        </div>
                        <p className="mt-2 flex items-center text-sm text-green-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          In stock
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 lg:mt-0 lg:w-1/4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal(cart)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {calculateShipping(cart) === 0
                        ? "Free"
                        : `₹${calculateShipping(cart)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{calculateTax(cart)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Fixed Discount</span>
                    <span>₹{calculateDiscount(cart)}</span>
                  </div>
                  {isPromoCodeValid && (
                    <div className="flex justify-between text-gray-600">
                      <span>Promo Discount</span>
                      <span>₹{calculatePromoDiscount(cart, promoCode)}</span>
                    </div>
                  )}

                  {!isPromoCodeValid && enterPromoCode && (
                    <div className="space-y-2">
                      <label
                        htmlFor="promo"
                        className="block text-sm text-gray-600"
                      >
                        Promo Code
                      </label>
                      <div className="flex flex-col space-y-2">
                        <input
                          type="text"
                          id="promo"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        <button
                          type="button"
                          className="bg-black text-white px-3 py-2 rounded-md"
                          onClick={() => {
                            if (calculatePromoDiscount(cart, promoCode) !== 0) {
                              setIsPromoCodeValid(true);
                              toast.success("Promo code applied");
                            } else {
                              setIsPromoCodeValid(false);
                              toast.error("Invalid Promo code");
                            }
                          }}
                        >
                          Apply
                        </button>
                        <button
                          type="button"
                          className="bg-red-600 text-white px-3 py-2 rounded-md"
                          onClick={() => setEnterPromoCode(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  {!enterPromoCode && !isPromoCodeValid && (
                    <button
                      type="button"
                      className="text-sm text-black hover:underline"
                      onClick={() => setEnterPromoCode(true)}
                    >
                      Have a promo code? Click here
                    </button>
                  )}

                  <div className="flex justify-between text-gray-900 font-medium">
                    <span>Order total</span>
                    <span>
                      {isPromoCodeValid
                        ? `₹${calculateGrandTotal(cart, promoCode)}`
                        : `₹${calculateTotalBeforePromo(cart)}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCart([]);
                    Router.push("/checkout");
                  }}
                  className="w-full rounded-md bg-black py-3 px-4 text-white font-medium shadow hover:bg-gray-800"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link href="/products" className="text-black hover:underline">
                    Continue Shopping &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <>
            <div className="flex justify-center py-10">
              <Image
                src={EmptyCart}
                alt="Empty Cart"
                width={450}
                height={400}
              />
            </div>
            <h1 className="text-2xl text-center font-bold">
              Your cart is empty.
            </h1>
          </>
        )}
      </div>
    </div>
  );
}
