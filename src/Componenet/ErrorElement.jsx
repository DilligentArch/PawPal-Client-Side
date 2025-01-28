import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-800">
      <div className="text-center p-6 max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-lg mb-4">
          {error?.statusText || error?.message || "An unexpected error occurred."}
        </p>
        <p className="text-gray-700 mb-6">
          Please try refreshing the page or go back to the homepage.
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default ErrorElement;
