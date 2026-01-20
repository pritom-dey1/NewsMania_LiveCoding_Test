// src/app/api/news/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Params extract
  const country = searchParams.get('country') || 'us';
  const category = searchParams.get('category') || ''; 
  const q = searchParams.get('q') || ''; 

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key missing in environment variables' },
      { status: 500 }
    );
  }

  try {
    let apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=${country}`;

    if (category) {
      apiUrl += `&category=${category}`;
    }

    if (q) {
      apiUrl += `&q=${encodeURIComponent(q)}`; 
    }


    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`NewsAPI error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'API returned error');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('News fetch error:', error.message);

    return NextResponse.json(
      { error: 'Failed to fetch news. Please try again later.' },
      { status: 500 }
    );
  }
}