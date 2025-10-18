"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { addUser } from "@/actions/serveractions";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      const res=await addUser(formData);

      // const data = await res.json();

      if (!res.message) {
        throw new Error(data.error || "Registration failed");
      }

      // Auto-login after successful registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/dashboard"); // Redirect to dashboard after successful registration
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignUp = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Create an Account 🎉</h1>
        <p className="text-gray-200 mb-8">Join Eventify and start your journey!</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-white/30"></div>
          <span className="mx-3 text-gray-200">or</span>
          <div className="flex-grow h-px bg-white/30"></div>
        </div>

        <div className="space-y-4">
          <button
            
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </button>

          <button
          onClick={handleGitHubSignUp}
            
            className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            <FaGithub className="text-xl" />
            Sign up with GitHub
          </button>
        </div>

        <p className="text-gray-200 mt-8 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;