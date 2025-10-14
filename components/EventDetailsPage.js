"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

// Sample event data (replace with API later)
// const events = [
//   {
//     id: "1",
//     title: "Music Festival 2025",
//     date: "Oct 25, 2025",
//     location: "Los Angeles, CA",
//     description:
//       "Join the biggest music festival of the year with amazing performances and vibes!",
//     image:
//       "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: "2",
//     title: "Corporate Gala Night",
//     date: "Nov 12, 2025",
//     location: "New York, NY",
//     description:
//       "An elegant night of networking, fine dining, and entertainment for professionals.",
//     image:
//       "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=800",
//   },
//   {
//     id: "3",
//     title: "Art & Crafts Fair",
//     date: "Dec 5, 2025",
//     location: "San Francisco, CA",
//     description:
//       "Explore local art, crafts, and handmade goods while enjoying live performances.",
//     image:
//       "https://images.unsplash.com/photo-1515169067863-5387ec356754?auto=format&fit=crop&q=80&w=800",
//   },
// ];

const EventDetailsPage = ({ event }) => {
    const router = useRouter();

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-700">
                <p>Event not found.</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
                    <div className="flex items-center gap-4 text-gray-500 mb-4">
                        <FaCalendarAlt /> <span>{new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}</span>
                        <FaMapMarkerAlt /> <span>{event.location}</span>
                    </div>
                    <p className="text-gray-700 mb-6">{event.description}</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition-all duration-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EventDetailsPage;
