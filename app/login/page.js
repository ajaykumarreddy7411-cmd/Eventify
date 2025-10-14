"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LoginPage = () => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6">
      {/* Login Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="text-gray-200 mb-8">Sign in to continue to Eventify</p>

        {/* Email Login (Optional for Later) */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-white/30"></div>
          <span className="mx-3 text-gray-200">or</span>
          <div className="flex-grow h-px bg-white/30"></div>
        </div>

        {/* Google & GitHub Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => alert("Google Auth Coming Soon!")}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <button
            onClick={() => alert("GitHub Auth Coming Soon!")}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            <FaGithub className="text-xl" />
            Continue with GitHub
          </button>
        </div>

        <p className="text-gray-200 mt-8 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-yellow-300 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
