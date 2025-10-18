"use server";

export const fetchAllEvents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`);
  const data = await res.json();
  return data;
};

export const fetchOneEvent = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events/${id}`);
  const data = await res.json();
  return data;
};

export const updateSeats = async (id, tickets) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/events/${id}/book`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickets }),
    }
  );
  const data = await res.json();
  return data;
};

export const editOrCreateEvent = async (email, form, mode, id) => {
  const method = mode === "edit" ? "PUT" : "POST";
  const url =
    mode === "edit"
      ? `${process.env.NEXT_PUBLIC_URL}/api/events/${id}`
      : `${process.env.NEXT_PUBLIC_URL}/api/events`;

  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...form,
      created_by: email,
    }),
  });

  const data = await res.json();

  return data;
};

export const deleteEvent = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();
  return data;
};


export const addUser=async (formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  const data = await res.json();
  return data;
};