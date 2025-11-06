"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { fetchAllEvents } from "@/actions/serveractions";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session,status } = useSession();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchAllEvents();
      setAllEvents(events);
    };
    getEvents();
  }, []);

  useEffect(() => {
    if (!query) return setFilteredEvents([]);
    const results = allEvents.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(results);
  }, [query, allEvents]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFilteredEvents([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-indigo-700/80 via-purple-700/80 to-pink-700/80 text-white sticky top-0 z-50 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3 md:px-10 relative">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-transparent bg-clip-text"
        >
          Eventify
        </Link>

        {/* Desktop Search + Links */}
        <div className="hidden md:flex flex-1 items-center justify-between ml-10">
          {/* Search */}
          <div className="flex flex-col relative w-80" ref={dropdownRef}>
            <form className="flex items-center bg-white/25 border border-white/40 rounded-full px-4 py-2 backdrop-blur-md shadow-inner shadow-white/20 focus-within:ring-2 focus-within:ring-yellow-300/60 transition-all duration-200">
              <input
                type="text"
                placeholder="Search events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent flex-grow outline-none text-white placeholder-white/80"
              />
              <button type="submit" className="text-white hover:text-yellow-300">
                <FaSearch />
              </button>
            </form>

            {filteredEvents.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-2xl shadow-2xl max-h-64 overflow-y-auto z-50">
                {filteredEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="block px-4 py-2 hover:bg-white/30 transition-colors duration-200"
                    onClick={() => setQuery("")}
                  >
                    {event.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 ml-8 font-medium">
            <Link href="/events" className="hover:text-yellow-300 transition duration-200">Events</Link>
            <Link href={status==="authenticated" ? "/dashboard" : "/login"} className="hover:text-yellow-300 transition duration-200">Dashboard</Link>

            {session?.user ? (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-white/15 px-5 py-1 rounded-full text-lg text-yellow-300 font-semibold shadow-md break-words">
                  {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-1.5 rounded-full font-semibold text-white shadow-md hover:opacity-90 hover:scale-105 transition duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 text-black font-semibold px-5 py-2 rounded-full shadow-md hover:opacity-90 hover:scale-105 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 px-5 py-4 flex flex-col gap-4">
          {/* Search */}
          <div className="relative" ref={dropdownRef}>
            <form className="flex items-center bg-white/25 border border-white/40 backdrop-blur-md rounded-full px-4 py-2 shadow-inner shadow-white/20">
              <input
                type="text"
                placeholder="Search events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent flex-grow outline-none text-white placeholder-white/80"
              />
              <button type="submit" className="text-white hover:text-yellow-300">
                <FaSearch />
              </button>
            </form>

            {filteredEvents.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-black/70 backdrop-blur-2xl border border-white/30 text-white rounded-2xl shadow-2xl max-h-64 overflow-y-auto z-50">
                {filteredEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="block px-4 py-2 hover:bg-white/30 transition-colors duration-200"
                    onClick={() => setQuery("")}
                  >
                    {event.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <Link href="/events" className="hover:text-yellow-300 transition duration-200">Events</Link>
          <Link hidden={status==="authenticated" ? false : true} href="/dashboard" className="hover:text-yellow-300 transition duration-200">Dashboard</Link>

          {session?.user ? (
            <>
              <span className="bg-white/15 px-5 py-1 rounded-full text-lg text-yellow-300 font-semibold shadow-md break-words text-center">
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-1.5 rounded-full font-semibold text-white shadow-md hover:opacity-90 hover:scale-105 transition duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 text-black font-semibold px-5 py-2 rounded-full shadow-md hover:opacity-90 hover:scale-105 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
