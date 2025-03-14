import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Get the password from environment variable
    const sitePassword = process.env.SITE_PASSWORD;
    
    if (!sitePassword) {
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (password === sitePassword) {
      // Password is correct
      const response = NextResponse.json(
        { success: true },
        { status: 200 }
      );
      
      // Set a cookie to remember the password was entered correctly
      // Using Edge Runtime compatible cookie setting
      response.cookies.set('site_access', 'granted', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      return response;
    } else {
      // Password is incorrect
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
} 