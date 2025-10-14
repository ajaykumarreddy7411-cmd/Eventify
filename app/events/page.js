
import React from "react";
import EventsPage from "@/components/EventsPage";

const page = async() => {
  let res=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`,{cache:'no-store'});
  let data=await res.json();
  
  

  return (
    <>
      <EventsPage events={data}/>
    </>
  );
};

export default page;
