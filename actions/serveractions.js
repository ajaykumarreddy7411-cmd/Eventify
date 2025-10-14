"use server"

export const fetchAllEvents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`);
  const data = await res.json();
  return data;
}