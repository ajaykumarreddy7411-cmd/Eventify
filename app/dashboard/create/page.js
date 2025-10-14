"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { title } from "framer-motion/client";

const CreateEventPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
    seats: "",
    price:"",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title:form.title,
        date:form.date,
        location:form.location,
        description:form.description,
        image:form.image,
        seats:form.seats,
        created_by: "john@example.com",// Replace with actual user email if available
        price:form.price, 
      }),
    });
    const data = await res.json();
    if (res.ok) {
      // Redirect to events page or show success
      router.push("/events");
    } else {
      alert(data.error || "Failed to create event");
    }
  } catch (error) {
    alert("Error creating event");
  }
};

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Event</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          {/* Event Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          {/* Event Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          {/* Event Desc*/}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Event Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter event Description"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>



          {/* Event Image URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Event Seats */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Seats</label>
            <input
              type="number"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              placeholder="Enter number of seats"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          {/* Event Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter number of seats"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEventPage;
