"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

const EventDetailsPage = ({ event }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (session?.user?.email && event?.created_by) {
      if (session.user.email === event.created_by) setHidden(false);
    }
  }, [session?.user?.email, event?.created_by]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gray-900 text-white py-16 px-6 md:px-16 flex items-center justify-center">
      {/* Blurred Background */}
      <div
        className="fixed inset-0 bg-cover bg-center filter blur-xl opacity-40"
        style={{ backgroundImage: `url(${event.image})` }}
      />

      {/* Glass Card */}
      <div className="relative z-10 max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Event Image */}
        <div className="w-full h-64 relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover rounded-t-3xl"
          />
        </div>

        {/* Event Details */}
        <div className="p-8 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl text-yellow-400">{event.title}</h1>
          </div>
          

          <div className="flex flex-col md:flex-row gap-6 text-gray-200 mt-2">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />{" "}
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

          <p className="text-gray-200 mt-4">{event.description}</p>

          <div className="flex  md:flex-row w-fit gap-3">
            <button
              hidden={hidden}
              onClick={() => router.push(`/dashboard/edit/${event.id}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/10 hover:text-white transition-all duration-300 shadow-md"
            >
              <FaEdit /> Edit
            </button>
            <button
              hidden={hidden}
              onClick={() => router.push(`/dashboard/delete/${event.id}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/10 hover:text-white transition-all duration-300 shadow-md"
            >
              <FaTrash /> Delete
            </button>
          </div>

          <button
            onClick={() => router.back()}
            className="mt-4 flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition"
          >
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
