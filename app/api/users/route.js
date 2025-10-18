import { NextResponse } from 'next/server';
import db from '@/lib/db';

// GET all users
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT id, full_name, email FROM users');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

