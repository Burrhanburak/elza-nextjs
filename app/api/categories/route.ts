import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_API_URL = process.env.INTERNAL_API_URL || 'https://api.elzadarya.com/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '10';
    const language = searchParams.get('language') || 'en';
    const search = searchParams.get('search') || '';

    const laravelUrl = new URL(`${LARAVEL_API_URL}/categories`);
    laravelUrl.searchParams.set('page', page);
    laravelUrl.searchParams.set('per_page', per_page);
    laravelUrl.searchParams.set('language', language);
    if (search) laravelUrl.searchParams.set('search', search);

    const response = await fetch(laravelUrl.toString(), {
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
    console.error('Categories API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}