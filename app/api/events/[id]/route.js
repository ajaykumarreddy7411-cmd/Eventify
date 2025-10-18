import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const [rows] = await db.execute(
      "SELECT e.*, u.full_name as organizer_name FROM events e JOIN users u ON e.created_by = u.email WHERE e.id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { title, date, location, description, image, seats,price } =
      await request.json();

    if (!title || !date || !location || !description || !image || !seats || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (seats <= 0) {
      return NextResponse.json(
        { error: "Seats must be a positive number" },
        { status: 400 }
      );
    }

    // Update the event in the database
    await db.execute(
      "UPDATE events SET title = ?, date = ?, location = ?, description = ?, image = ?, seats = ?, price = ? WHERE id = ?",
      [title, date, location, description, image, seats,price, id]
    );

    return NextResponse.json({ message: "Event updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Delete the event from the database
    const [result] = await db.execute("DELETE FROM events WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Event not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
