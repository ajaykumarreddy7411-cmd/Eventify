import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative backdrop-blur-md bg-gradient-to-r from-indigo-700/80 via-purple-700/80 to-pink-700/80 border-t border-white/10 text-white py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        {/* Left Section */}
        <p className="text-sm md:text-base text-white/90">
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 bg-clip-text text-transparent font-semibold">
            Eventify
          </span>
          . All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5">
          {[
            { Icon: FaFacebookF, color: "from-blue-400 to-blue-600" },
            { Icon: FaTwitter, color: "from-sky-300 to-sky-500" },
            { Icon: FaInstagram, color: "from-pink-400 to-orange-400" },
            { Icon: FaLinkedinIn, color: "from-blue-300 to-indigo-500" },
          ].map(({ Icon, color }, i) => (
            <a
              key={i}
              href="#"
              className={`group relative p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r ${color} hover:text-white`}
            >
              <Icon className="w-4 h-4 text-white/80 group-hover:text-white transition-all" />
            </a>
          ))}
        </div>
      </div>

      {/* Subtle glow at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 opacity-70 blur-[2px]" />
    </footer>
  );
}
