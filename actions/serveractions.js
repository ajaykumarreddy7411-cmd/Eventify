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

export const updateSeats=async(id,tickets)=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events/${id}/book`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({tickets}),
  })
  const data=await res.json();
  return data;
}

