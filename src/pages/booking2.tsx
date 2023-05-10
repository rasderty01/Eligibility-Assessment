import React from "react";

const CenteredForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-all duration-300 ease-in-out">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 transition-all duration-300 ease-in-out">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Welcome to Our Website
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Please enter your email address to stay up-to-date with our latest
          news and updates.
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-green-400 focus:ring-1 focus:ring-green-400 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CenteredForm;
