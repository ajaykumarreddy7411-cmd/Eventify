
import React from "react";
import EventDetailsPage from "@/components/EventDetailsPage";




const eventdetails = async({params}) => {
  const id=await params.id
  const res=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`,{cache:'no-store'});
  const events=await res.json();
  const event = events.find((e) => e.id === Number(id));
  return (
    <>
    <EventDetailsPage event={event}/>
    </>
  );
};

export default eventdetails;
