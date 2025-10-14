"use client";
import React, { use } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { fetchAllEvents } from "@/actions/serveractions";
import { useEffect, useState } from "react";
import Link from "next/link";

// Sample user and event data (replace with API later)
const user = {
  name: "John Doe",
  email: "john@example.com",
  joined: "Jan 15, 2025",
};

// const userEvents = [
//   {
//     id: 1,
//     title: "Music Festival 2025",
//     date: "Oct 25, 2025",
//     location: "Los Angeles, CA",
//   },
//   {
//     id: 2,
//     title: "Corporate Gala Night",
//     date: "Nov 12, 2025",
//     location: "New York, NY",
//   },
// ];

const DashboardPage = () => {
  const router = useRouter();
  const [userevents, setUserEvents] = useState([]);
  useEffect(() => {
    getEvents()


  }, [])
  const getEvents = async () => {
    const events = await fetchAllEvents()

    const userEvents = events.filter(event => event.created_by === user.email);
    setUserEvents(userEvents)
  }

  const handleDelete = async (eventId) => {
    try {
      const res = await fetch('/api/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId }),
      });

      if (res.ok) {
        // ✅ Fetch events again after deletion
        getEvents();
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }


  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => router.push("/dashboard/create")}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
          >
            <FaPlus /> Create Event
          </button>
        </div>

        {/* User Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
            <div><span className="font-semibold">Name:</span> {user.name}</div>
            <div><span className="font-semibold">Email:</span> {user.email}</div>
            <div><span className="font-semibold">Joined:</span> {user.joined}</div>
          </div>
        </div>

        {/* Your Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userevents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
              ><Link href={`/events/${event.id}`}  >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                    <p className="text-gray-500 mt-1">{new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}</p>
                    <p className="text-gray-500">{event.location}</p>
                  </div></Link>
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={(e) => { handleDelete(event.id) }} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-500 transition">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DashboardPage;
