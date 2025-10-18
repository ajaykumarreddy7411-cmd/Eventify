"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Ticket, Share2, ArrowLeft } from "lucide-react";
import { fetchOneEvent, updateSeats } from "@/actions/serveractions";
import html2canvas from "html2canvas";

const BookNowPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await fetchOneEvent(id);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Loading event details...
      </div>
    );
  }

  const handleIncrease = () => {
    if (ticketCount < event.available_seats) setTicketCount(ticketCount + 1);
  };

  const handleDecrease = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1);
  };

  const totalPrice = event.price * ticketCount;

  const handleBookNow = async () => {
    const res = await updateSeats(id, ticketCount);
    if (res?.error) {
      alert(res.error);
      return;
    }

    setEvent({ ...event, available_seats: res.available_seats });

    setBookingInfo({
      title: event.title,
      image: event.image,
      tickets: ticketCount,
      total: totalPrice,
      date: event.date,
      location: event.location,
    });
    setShowPopup(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Tickets for ${event.title}`,
          text: `I just booked ${ticketCount} ticket(s) for ${event.title}!`,
          url: window.location.href,
        })
        .catch((err) => console.error(err));
    } else {
      alert("Sharing not supported on this browser");
    }
  };

  const handleScreenshot = () => {
    const element = document.getElementById("ticket-popup");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const newWindow = window.open();
      newWindow.document.write(`<img src="${imgData}" style="width:100%">`);
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      
      {/* Go Back Button */}
      <button
        onClick={() => router.push("/events")}
        className="fixed top-20 left-4 z-50 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl backdrop-blur-md shadow-md transition"
      >
        <ArrowLeft size={18} /> Go Back
      </button>

      {/* Background Glow */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-40"
        style={{ backgroundImage: `url(${event.image})` }}
      ></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-3xl border border-white/20 
             rounded-3xl shadow-2xl p-10 w-[95%] max-w-4xl text-white 
             md:p-12"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={event.image || "/eventify.png"}
            alt={event.title}
            className="w-full md:w-1/2 rounded-2xl object-cover shadow-lg"
          />

          <div className="flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-3xl font-semibold mb-3">{event.title}</h1>
              <p className="text-white/70 mb-3 flex items-center gap-2">
                <CalendarDays size={18} /> {new Date(event.date).toDateString()}
              </p>
              <p className="text-white/70 mb-3 flex items-center gap-2">
                <MapPin size={18} /> {event.location}
              </p>
              <p className="text-lg font-medium mb-3">Price: ₹{event.price}</p>
              <p className="text-white/60 text-sm">
                Available Seats: {event.available_seats}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecrease}
                  className="bg-white/10 hover:bg-white/20 text-white w-9 h-9 rounded-full text-lg flex items-center justify-center transition"
                >
                  −
                </button>
                <span className="text-xl font-semibold">{ticketCount}</span>
                <button
                  onClick={handleIncrease}
                  className="bg-white/10 hover:bg-white/20 text-white w-9 h-9 rounded-full text-lg flex items-center justify-center transition"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="text-white/70 text-sm">Total Amount</p>
                <p className="text-2xl font-bold">₹{totalPrice}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBookNow}
              className="mt-6 bg-cyan-500/80 hover:bg-cyan-400 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Ticket size={18} /> Proceed to Payment
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Simple Popup */}
      {showPopup && bookingInfo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            id="ticket-popup"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "20px",
              borderRadius: "16px",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            <img
              src={bookingInfo.image || "/eventify.png"}
              alt={bookingInfo.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "10px",
              }}
            />
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
              {bookingInfo.title}
            </h2>
            <p>Date: {new Date(bookingInfo.date).toDateString()}</p>
            <p>Location: {bookingInfo.location}</p>
            <p>Tickets: {bookingInfo.tickets}</p>
            <p>Total: ₹{bookingInfo.total}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button onClick={handleShare} style={{ padding: "6px 12px", borderRadius: "8px" }}>
                Share
              </button>
              <button onClick={handleScreenshot} style={{ padding: "6px 12px", borderRadius: "8px" }}>
                Screenshot
              </button>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "18px",
              }}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BookNowPage;
