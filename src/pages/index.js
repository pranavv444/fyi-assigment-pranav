import Link from "next/link";
import React from "react";

export default function Example() {
  return (
    <div className="relative overflow-hidden bg-gray-400 min-h-screen my-[-45px] svg-hero">
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
            <Link href="/products">
              <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-4xl md:mt-5 md:max-w-3xl md:text3xl font-Lato flex items-center justify-center">
                Move with the trend.
                <span className="ml-4 text-5xl">→</span>
              </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}