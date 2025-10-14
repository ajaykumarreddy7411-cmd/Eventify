"use client";
import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const HeroSection = () => {
  return (
    <section className="min-h-[87vh] relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

      {/* Left Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-xl space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Make Every Event <span className="text-yellow-300">Unforgettable</span>
        </h1>
        <p className="text-lg text-gray-100">
          Discover, plan, and manage events effortlessly — from small meetups to
          grand festivals. Join now and be part of the experience!
        </p>

        <div className="flex gap-4 mt-6">
          <Link href={"/events"}><button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <CalendarDays className="w-5 h-5" />
            Explore Events
          </button></Link>

          <Link href={"/login"}><button className="border border-white bg-transparent hover:bg-white/20 text-white rounded-full px-6 py-3 flex items-center gap-2 transition-all duration-300">
            Get Started <ArrowRight className="w-5 h-5" />
          </button></Link>
        </div>
      </motion.div>

      {/* Right Image Section - Bigger and centered */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 mt-10 md:mt-0 flex justify-center md:justify-end w-full md:w-1/2"
      >
        <Image
          src="/main.webp"
          alt="Event Illustration"
          width={700}
          height={500}
          className=" md:w-[600px] lg:w-[700px] rounded-2xl shadow-2xl object-cover"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
