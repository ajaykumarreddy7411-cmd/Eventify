//get one user by id
import { NextResponse } from 'next/server';
import db from '@/lib/db';

// GET user by ID

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const [rows] = await db.execute('SELECT full_name, email, created_at FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}