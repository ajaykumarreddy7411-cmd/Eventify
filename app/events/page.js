
import React from "react";
import EventsPage from "@/components/EventsPage";
import { fetchAllEvents } from "@/actions/serveractions";

const page = async() => {
  // let res=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`,{cache:'no-store'});
  // let data=await res.json();
  let data=await fetchAllEvents();
  
  

  return (
    <>
      <EventsPage events={data}/>
    </>
  );
};

export default page;
