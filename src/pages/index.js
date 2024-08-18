import Link from "next/link";
import React from "react";

export default function Example() {
  return (
    <div className="relative overflow-hidden bg-gray-50 min-h-screen my-[-45px] svg-hero">
      <div
        className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full"
        aria-hidden="true"
      >
        <div className="relative mx-auto h-full max-w-7xl"></div>
      </div>

      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mx-auto mt-40 max-w-7xl px-4 sm:mt-48 ">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-7xl">
              <span className="block xl:inline font-Lustria">
             ChicMart
              </span>{" "}
              
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl md:text3xl font-Lato">
              Move with the trend.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/products"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 md:py-4 md:px-10 md:text-lg font-Lato"
                >
                  Upgrade Your Wardrobe . . .
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
