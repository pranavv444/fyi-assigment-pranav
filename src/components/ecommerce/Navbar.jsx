import React from "react";
import { XMarkIcon, Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useCartStore } from "@/store";
import Link from "next/link";
import Router from "next/router";

function Navbar() {
  const navigation = [
    { name: "Cart", href: "/cart" },
  ];
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);

  return (
    <div className="bg-gray-300 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="lg:hidden flex items-center space-x-4">
          <Link
            href={navigation[0].href}
            className="relative flex items-center text-white"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white font-semibold rounded-full px-2 text-xs">
              {cart?.length}
            </span>
          </Link>
          <button
            type="button"
            className="text-white hover:text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <Link href="/" className="text-black text-2xl font-Lustria mx-auto lg:mx-0 lg:flex-1 text-center">
          ChicCart
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center text-sm font-bold text-black hover:text-white"
            >
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              {item.name}
              <span className="ml-2 bg-gray-600 text-white font-semibold square-full px-2">
                {cart?.length}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <Dialog.Panel className="fixed inset-0 z-50 overflow-y-auto bg-black px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white text-2xl font-Lustria">
              ChicCart
            </Link>
            <button
              type="button"
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6">
            {navigation.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  Router.push(item.href);
                  setMobileMenuOpen(false);
                }}
                className="mt-4 text-white font-bold text-lg flex items-center space-x-4 cursor-pointer hover:text-gray-300"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {item.name}
                <span className="ml-2 bg-red-600 text-white font-semibold rounded-full px-2 text-xs">
                  {cart?.length}
                </span>
              </div>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

export default Navbar;