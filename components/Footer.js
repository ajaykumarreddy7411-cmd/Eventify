
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white py-5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left */}
        <p className="text-sm md:text-base mb-4 md:mb-0">
          © {new Date().getFullYear()} Eventify. All rights reserved.
        </p>

        {/* Right - Social Icons */}
        <div className="flex gap-4 text-white">
          <a href="#" className="hover:text-yellow-300 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
