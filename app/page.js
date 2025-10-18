"use client";
import React, { use, useRef,useState,useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CalendarDays,
  ArrowRight,
  Zap,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Main component
const EventHomePage = () => {
  const parallaxRef = useRef(null);
  const router = useRouter();
  const [hidden,setHidden]=useState(false);
  const { data: session,status } = useSession();

  useEffect(() => {
    if(status==="unauthenticated"){
      setHidden(false);
    }else{
      setHidden(true);
    }
  
    
  }, [])
  
  


  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });

  // Create a parallax effect for the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="min-h-screen relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-500/50 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-20 w-full md:w-1/2 max-w-2xl space-y-8 text-center md:text-left"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Make Every Event Unforgettable
          </motion.h1>

          <motion.p
            className="text-lg text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Discover, plan, and manage events effortlessly — from small meetups
            to grand festivals. Join now and be part of the experience!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <button onClick={()=>router.push("/events")} className="bg-white/90 backdrop-blur-sm hover:bg-white text-purple-700 font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <CalendarDays className="w-5 h-5" />
              Explore Events
            </button>

            <button hidden={hidden} onClick={()=>router.push("/login")} className="border border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full px-6 py-3 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 1,
            delay: 0.5,
          }}
          className="z-10 mt-12 md:mt-0 flex justify-center md:justify-end w-full md:w-1/2"
        >
          <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] relative">
            <img
              src="https://imgs.search.brave.com/tdtcCssm_SMW9fjzJ6FfZaTESRvbafxrOhzKV_lVQMA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE4/ODkyNzk3MS9waG90/by9hdWRpZW5jZS1j/aGVlcmluZy1hdC1j/b25jZXJ0LWFuZC1h/LXBhcnR5LndlYnA_/YT0xJmI9MSZzPTYx/Mng2MTImdz0wJms9/MjAmYz16SnpidFht/YUdxQ25SeWlwek00/alNlR2hmNHIycG80/OUVJMWktbkdtb0xB/PQ"
              alt="Event Illustration"
              className="w-full h-full rounded-2xl shadow-2xl object-cover transform rotate-6 hover:rotate-0 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/700x500/DB2777/FFFFFF?text=Events";
              }}
            />
            <img
              src="https://imgs.search.brave.com/bpefSdYoFMb-bgiIleonvgOtCbwF-dHOQxi3VXDZ6sY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/ZW9wbGUtY29uY2Vy/dC13aXRoLXNtb2tl/LW92ZXJsYXktdGV4/dHVyZV81Mzg3Ni0x/MjY4NTYuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw"
              alt="Community Illustration"
              className="w-full h-full rounded-2xl shadow-2xl object-cover absolute top-0 left-0 transform -rotate-6 hover:rotate-0 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/700x500/8B5CF6/FFFFFF?text=Community";
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: PARALLAX & FEATURES */}
      <section
        ref={parallaxRef}
        className="relative h-[120vh] bg-gray-900 text-white overflow-hidden"
      >
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://imgs.search.brave.com/hdwsDiOLI7hlrkyONHaMaICoFy-mdvXv2WjI4JSSNiQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jcm93ZC1tdXNp/Yy1jb25jZXJ0XzEw/NDg5NDQtMTcyMTE4/NjEuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MCZxPTgw')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: backgroundY,
          }}
        />
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full p-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            Why Choose Our Platform?
          </motion.h2>
          <motion.p
            className="max-w-3xl text-lg text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We provide an all-in-one solution to make event management seamless,
            engaging, and secure.
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Card 1 - Modern UI */}
            <motion.div
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-500/20 text-purple-300 rounded-full mx-auto">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Modern UI</h3>
              <p className="text-gray-400">
                Experience a sleek, responsive, and visually stunning interface
                designed for seamless event management across all devices.
              </p>
            </motion.div>

            {/* Card 2 - All Events in One Place */}
            <motion.div
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-pink-500/20 text-pink-300 rounded-full mx-auto">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                All Events in One Place
              </h3>
              <p className="text-gray-400">
                Discover, create, and manage all your events effortlessly in one
                unified dashboard — everything you need, right where you need
                it.
              </p>
            </motion.div>

            {/* Card 3 - Secure & Reliable */}
            <motion.div
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-500/20 text-green-300 rounded-full mx-auto">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-400">
                Your data and transactions are protected with top-tier
                encryption and robust infrastructure for complete peace of mind.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Basic CSS for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-4000 {
          animation-delay: -4s;
        }
      `}</style>
    </>
  );
};

export default EventHomePage;
