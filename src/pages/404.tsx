import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  const home = () => {
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-r from-yellow-300 to-blue-400 ">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-purple-400">404</h1>
            <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
            <button
              onClick={home}
              className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-blue-500 hover:to-green-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
            >
              HOME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
