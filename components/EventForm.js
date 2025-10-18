"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { editOrCreateEvent } from "@/actions/serveractions";

export default function EventForm({ mode = "create", eventData = {} }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
    seats: "",
    price: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success"); // success / error

  useEffect(() => {
    // if (status === "unauthenticated") {
    //   router.push("/login");
    // }

    if (mode === "edit" && eventData) {
      setForm({
        title: eventData.title || "",
        date: eventData.date?.split("T")[0] || "",
        location: eventData.location || "",
        description: eventData.description || "",
        image: eventData.image || "",
        seats: eventData.seats || "",
        price: eventData.price || "",
      });
    }
  }, [mode, eventData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // ✅ Ensure numeric fields stay numbers (prevents rounding/loss issues)
    const newValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const method = mode === "edit" ? "PUT" : "POST";
      // const url =
      //   mode === "edit" ? `/api/events/${eventData.id}` : `/api/events`;

      // const res = await fetch(url, {
      //   method,
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     ...form,
      //     created_by: session?.user.email,
      //   }),
      // });

      const email = session?.user.email;

      const data = await editOrCreateEvent(email, form, mode, eventData.id);

      if (data.message) {
        setStatusType("success");
        setStatusMessage(
          `Event ${mode === "edit" ? "updated" : "created"} successfully!`
        );
        setTimeout(() => router.push("/events"), 1500);
      } else {
        setStatusType("error");
        setStatusMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatusType("error");
      setStatusMessage("Error saving event");
    }
  };

  const backgroundImage = mode === "edit" ? eventData.image : "/eventify.png";

  // if (status === "loading") {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-slate-900">
  //       <GlassLoader size={80} borderWidth={5} />
  //     </div>
  //   );
  // }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 px-6 md:px-16 bg-gray-900">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center filter blur-xl opacity-30"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Glass Card */}
      <div className="relative z-10 max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
          {mode === "edit" ? "Edit Event" : "Create New Event"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["title", "location", "description", "image", "seats", "price"].map(
            (field) => (
              <div key={field}>
                <label className="block text-white font-medium mb-1 capitalize">
                  {field === "image" ? "Image URL" : field}
                </label>
                <input
                  type={
                    field === "seats" || field === "price" ? "number" : "text"
                  }
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter event ${field}`}
                  className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-indigo-400 border border-white/20"
                  required={field !== "image"}
                />
              </div>
            )
          )}

          {/* Date Field */}
          <div>
            <label className="block text-white font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-indigo-400 border border-white/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 shadow-lg"
          >
            {mode === "edit" ? "Update Event" : "Create Event"}
          </button>
        </form>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-lg text-center font-semibold ${
              statusType === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </section>
  );
}
