"use client";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaTag } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function EventsPage({ events = [] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {data:session,status}=useSession();

  // Simulate loading (you can remove if you already have async fetch)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-900 text-white py-16 px-6 md:px-16 overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="fixed inset-0 bg-cover bg-center filter blur-xl opacity-40"
        style={{ backgroundImage: `url(/eventify.png)` }}
      />

      {/* Optional Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header + Create Button */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-5">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
              Upcoming Events
            </h1>
            <p className="text-gray-300 mt-2">
              Explore and join exciting events happening near you!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {status==="authenticated" ? router.push("/dashboard/create") : router.push("/login")}}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-yellow-400/40 hover:text-white transition-all duration-500"
          >
            <FaPlus className="text-lg" /> Create Event
          </motion.button>
        </div>

        {/* Events / Loading Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/10 rounded-2xl h-80 backdrop-blur-md border border-white/10"
              >
                <div className="h-40 bg-white/20 rounded-t-2xl" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-white/20 rounded w-3/4" />
                  <div className="h-3 bg-white/20 rounded w-1/2" />
                  <div className="h-3 bg-white/20 rounded w-2/3" />
                  <div className="h-10 bg-white/20 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 overflow-hidden hover:border-purple-400/50 hover:shadow-purple-500/20 cursor-pointer relative"
                onClick={() => router.push(`/events/${event.id}`)}
              >
                {/* Event Image */}
                <div className="relative">
                  <img
                    src={event.image || "/eventify.png"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Event Info */}
                <div className="flex w-full">
                  <div className="p-6 flex flex-col gap-3 w-1/2">
                    <h2 className="text-xl font-semibold text-yellow-300">
                      {event.title}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <FaCalendarAlt className="text-yellow-400" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <FaMapMarkerAlt className="text-pink-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  {/* Price & Available Seats */}
                  <div className="flex items-end px-5 flex-col justify-center gap-3 mt-2 w-1/2">
                    {event.price && (
                      <span className="w-fit px-3 py-1 bg-white/10 border border-white/20 rounded-full text-gradient font-semibold text-white/90 backdrop-blur-md">
                        ₹{event.price}
                      </span>
                    )}
                    {event.available_seats !== undefined && (
                      <span className="w-fit px-3 py-1 bg-white/10 border border-white/20 rounded-full text-gradient font-semibold text-white/90 backdrop-blur-md">
                        {event.available_seats} seats
                      </span>
                    )}
                  </div>
                </div>
                {/* Register Button Full Width */}
                <div className="w-full p-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="w-full mt-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-md hover:shadow-purple-400/30 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click
                      status==="authenticated" ? router.push(`/events/${event.id}/bookNow`) : router.push("/login");
                     
                    }}
                  >
                    BookNow
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
