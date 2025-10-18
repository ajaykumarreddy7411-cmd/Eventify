import React from "react";
import EventForm from "@/components/EventForm";

async function getEventData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function EditEventPage({ params }) {
  const eventData = await getEventData(params.id);
  return <EventForm mode="edit" eventData={eventData} />;
}
