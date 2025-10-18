import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { tickets } = await request.json();

    if (!tickets || tickets <= 0) {
      return NextResponse.json(
        { error: "Invalid ticket count" },
        { status: 400 }
      );
    }

    // Fetch current available seats
    const [rows] = await db.execute(
      "SELECT seats, available_seats FROM events WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const event = rows[0];

    if (tickets > event.available_seats) {
      return NextResponse.json(
        { error: "Not enough seats available" },
        { status: 400 }
      );
    }

    // Reduce available seats
    const newAvailable = event.available_seats - tickets;

    await db.execute(
      "UPDATE events SET available_seats = ? WHERE id = ?",
      [newAvailable, id]
    );

    return NextResponse.json({
      message: `Successfully booked ${tickets} tickets`,
      available_seats: newAvailable,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to book tickets" },
      { status: 500 }
    );
  }
}
