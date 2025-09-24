import { NextResponse } from 'next/server';

const LARAVEL_API_URL = process.env.INTERNAL_API_URL || 'https://api.elzadarya.com/api';

export async function GET() {
  try {
    const response = await fetch(`${LARAVEL_API_URL}/poems/featured`, {
      next: { revalidate: 300 } // 5 minutes cache
    });

    if (!response.ok) {
      throw new Error(`Laravel API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Featured Poems API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured poems' },
      { status: 500 }
    );
  }
}