import { NextResponse } from 'next/server';

const API_URL = 'https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/users';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { success: false, message: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(API_URL);
    const users = await res.json();

    const existingUser = users.find((user: any) => user.name === name || user.email === email);

    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    const createRes = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!createRes.ok) {
      throw new Error('Failed to create user');
    }

    const newUser = await createRes.json();

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
