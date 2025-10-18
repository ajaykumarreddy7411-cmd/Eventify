import { NextResponse } from 'next/server';
import db from '@/lib/db';

// GET all events
export async function GET() {
  try {
    const [rows] = await db.execute(
      'SELECT e.*, u.full_name as organizer_name FROM events e JOIN users u ON e.created_by = u.email ORDER BY e.date ASC'
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST new event
export async function POST(request) {
  try {
    const { title, date, location, description, image, seats, created_by,price } = await request.json();

    if (!title || !date || !location || !description || !image || !seats || !created_by || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (seats <= 0) {
      return NextResponse.json({ error: 'Seats must be a positive number' }, { status: 400 });
    }

    // Insert new event into the database
    
    const [result] = await db.execute(
      'INSERT INTO events (title, date, location, description, image, seats, available_seats, created_by,price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, date, location, description, image, seats, seats, created_by,price]
    );
    
    return NextResponse.json({ id: result.insertId, message: 'Event created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

// DELETE event by id
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    // Delete the event from the database
    const [result] = await db.execute(
      'DELETE FROM events WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Event not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
