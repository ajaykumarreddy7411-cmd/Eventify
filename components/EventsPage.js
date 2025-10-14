"use client";
import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaTag } from "react-icons/fa";
import { useRouter } from "next/navigation";

const EventsPage = ({ events }) => {
    const router = useRouter();

    return (
        <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
            {/* Header + Create Event Button */}
            <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Upcoming Events
                    </h1>
                    <p className="text-gray-600 mt-3">
                        Explore and join the events happening near you!
                    </p>
                </div>

                {/* Create Event Button */}
                <button
                    onClick={() => router.push("/dashboard/create")}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 mt-4 md:mt-0"
                >
                    <FaPlus /> Create Event
                </button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                    >
                        {/* Event Image */}
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                        />

                        {/* Event Info */}
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>

                            <div className="flex items-center gap-3 text-gray-500 mt-3">
                                <FaCalendarAlt /> <span>{new Date(event.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 mt-1">
                                <FaMapMarkerAlt /> <span>{event.location}</span>
                            </div>

                            {/* Price */}
                            {event.price && (
                                <div className="flex items-center gap-2 mt-3 text-gray-700 font-semibold">
                                    <FaTag className="text-green-600" />
                                    <span>₹{event.price}</span>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={() => router.push(`/events/${event.id}`)}
                                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition-all duration-300"
                                >
                                    View Details
                                </button>

                                <button
                                    onClick={() => router.push(`/events/${event.id}/register`)}
                                    className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EventsPage;
