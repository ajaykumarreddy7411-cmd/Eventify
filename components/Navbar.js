"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Later, connect this to your search API or route
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Eventify
        </Link>

        {/* Search Bar (visible on md+) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-80"
        >
          <input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent flex-grow outline-none text-white placeholder-white/70"
          />
          <button type="submit" className="text-white hover:text-yellow-300">
            <FaSearch />
          </button>
        </form>

        {/* Links */}
        <div className="flex items-center gap-5 font-medium">
          <Link href="/events" className="hover:text-yellow-300 transition">
            Events
          </Link>
          <Link href="/dashboard" className="hover:text-yellow-300 transition">
            Dashboard
          </Link>
          <Link
            href="/login"
            className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Search (visible below md) */}
      <div className="md:hidden px-4 pb-3">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent flex-grow outline-none text-white placeholder-white/70"
          />
          <button type="submit" className="text-white hover:text-yellow-300">
            <FaSearch />
          </button>
        </form>
      </div>
    </nav>
  );
}
