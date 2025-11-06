"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/serveractions";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUserCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { fetchAllEvents } from "@/actions/serveractions";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userevents, setUserEvents] = useState([]);

  const user = {
    name: session?.user.name || "No Name",
    email: session?.user.email || "No Email",
    joined: session?.user.created_at || "N/A",
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") {
      const getEvents = async () => {
        try {
          const events = await fetchAllEvents();
          const userEvents = events.filter(
            (event) => event.created_by === user.email
          );
          setUserEvents(userEvents);
        } catch (err) {
          console.error("Error fetching events:", err);
        }
      };
      getEvents();
       console.log(session?.user?.created_at);
    }
  }, [status, router, user.email]);

  if (status === "loading")
    return (
      <p className="text-center mt-20 text-gray-200">Loading Dashboard...</p>
    );

  const handleDelete = async (eventId) => {
    try {
      // const res = await fetch("/api/events", {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id: eventId }),
      // });

      const res=await deleteEvent(eventId);
      if (res.message) setUserEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 py-16 px-4 md:px-16 text-white">
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-cover bg-center filter blur-xl opacity-40"
        style={{ backgroundImage: `url(/eventify.png)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-5xl font-extrabold drop-shadow-lg tracking-tight">
              Welcome, {user.name.split(" ")[0] || "User"}!
            </h1>
            <p className="text-white/70 mt-2 text-lg drop-shadow">
              Here's your personal dashboard. Manage your events effortlessly.
            </p>
          </div>
          {/* Create Event Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push("/dashboard/create")}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-yellow-400/40 hover:text-white transition-all duration-500"
          >
            <FaPlus className="text-lg" /> Create Event
          </motion.button>
        </div>

        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 hover:shadow-2xl transition">
          {/* Left: Avatar */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <FaUserCircle size={50} className="text-white/80" />
            <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
          </div>

          {/* Center: Email */}
          <div className="text-white/70 w-full sm:w-auto text-center sm:text-left">
            <p className="truncate">Email: {user.email}</p>
          </div>

          {/* Right: Joined Date */}
          <div className="text-white/70 w-full sm:w-auto text-center sm:text-right mt-2 sm:mt-0">
            <p>
              Joined:{" "}
              {user.joined
                ? new Date(user.joined).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Events Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 drop-shadow text-white">
            Your Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userevents.length > 0 ? (
              userevents.map((event) => (
                <div
                  key={event.id}
                  className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden hover:scale-105 hover:shadow-2xl transition transform duration-300"
                >
                  {/* Event Image Background */}
                  {event.image && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-30"
                      style={{ backgroundImage: `url(${event.image})` }}
                    ></div>
                  )}
                  <div className="relative p-6 flex flex-col gap-4">
                    <Link href={`/events/${event.id}`}>
                      <h3 className="text-2xl font-bold text-white drop-shadow cursor-pointer">
                        {event.title}
                      </h3>
                    </Link>
                    <div className="flex flex-col gap-1 text-white/70 text-sm">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>
                          {event.date
                            ? new Date(event.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "No Date"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt /> <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/edit/${event.id}`)
                        }
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-transform duration-300"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-red-500/50 hover:scale-105 transition-all duration-300"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/70 col-span-full text-center mt-10">
                You haven't created any events yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
