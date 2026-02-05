"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("keycloak", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-sm p-8 border border-gray-200 rounded-lg">
          <h1 className="mb-6 font-semibold text-gray-900 text-2xl">Sign in</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700 text-sm"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700 text-sm"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full text-white transition-colors disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
              Forgot password?
            </a>
          </div>
        </div>

        <p className="mt-4 text-gray-600 text-sm text-center">
          {`Don't have an account?`}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
