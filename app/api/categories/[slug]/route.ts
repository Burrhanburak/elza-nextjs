import { NextRequest, NextResponse } from 'next/server';

const LARAVEL_API_URL = process.env.INTERNAL_API_URL || 'https://api.elzadarya.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const response = await fetch(`${LARAVEL_API_URL}/categories/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 } // 5 minutes cache
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { success: false, error: 'Category not found' },
          { status: 404 }
        );
      }
      throw new Error(`Laravel API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Category Detail API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}