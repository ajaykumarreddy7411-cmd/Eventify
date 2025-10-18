"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Loginpage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleLogin = async () => {
    if (isLoading) return; // prevent multiple clicks
    setIsLoading(true);
    setAuthError("");

    if (!email) {
      setAuthError("Please enter your email");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setAuthError("Please enter your password");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // prevent page reload
      });

      if (!result.error) {
        router.push("/dashboard"); // redirect on success
      } else {
        setAuthError(result.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="text-gray-200 mb-8">Sign in to continue to Eventify</p>
        

        {authError && (
          <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg mb-4">
            {authError}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            type="button" // important!
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p className="text-gray-200 mt-8 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-yellow-300 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
};

export default Loginpage;
