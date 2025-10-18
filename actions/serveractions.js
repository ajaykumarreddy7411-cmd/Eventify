"use server"

export const fetchAllEvents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`);
  const data = await res.json();
  return data;
}

export const fetchOneEvent=async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events/${id}`);
  const data = await res.json();
  return data;
}

