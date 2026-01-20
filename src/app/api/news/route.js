// src/app/api/news/route.js

import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const country = searchParams.get('country') || 'us';
  const category = searchParams.get('category') || '';
  const q = searchParams.get('q') || '';
  const language = searchParams.get('language') || '';
  const sources = searchParams.get('sources') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const apiKey = process.env.NEWS_API_KEY;

  try {
    const headlinesCollection = await getCollection('headlines');

    // Ensure unique index on URL exists
    await headlinesCollection.createIndex({ url: 1 }, { unique: true });

    // --- DB Query ---
    const dbQuery = {};
    if (country && country !== 'us') dbQuery['queryParams.country'] = country;
    if (category) dbQuery['queryParams.category'] = category;
    if (q) dbQuery.title = { $regex: q, $options: 'i' };
    if (language) dbQuery['queryParams.language'] = language;
    if (sources) dbQuery['queryParams.sources'] = sources;

    if (from || to) {
      dbQuery.fetchedAt = {};
      if (from) dbQuery.fetchedAt.$gte = new Date(from);
      if (to) dbQuery.fetchedAt.$lte = new Date(`${to}T23:59:59.999Z`);
    }

    console.log('DB Query:', JSON.stringify(dbQuery, null, 2));

    let articles = await headlinesCollection
      .find(dbQuery)
      .sort({ publishedAt: -1 })
      .toArray();

    // --- Fetch from NewsAPI if no cached results ---
    if (articles.length === 0) {
      console.log('No cached results - fetching from NewsAPI');

      if (!apiKey) {
        return NextResponse.json({ error: 'API key missing' }, { status: 500 });
      }

      let apiUrl = '';
      let useEverything = false;

      // Use 'everything' endpoint if language filter is specified
      if (language) {
  useEverything = true;
  
  // minimal required parameter added
  let keyword = q || 'news'; // fallback keyword if q empty

  apiUrl = `https://newsapi.org/v2/everything?apiKey=${apiKey}&language=${language}&q=${encodeURIComponent(keyword)}`;
  
  if (from) apiUrl += `&from=${from}`;
  if (to) apiUrl += `&to=${to}`;
}else {
        // fallback to top-headlines
        apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
        if (sources) {
          apiUrl += `&sources=${encodeURIComponent(sources)}`;
        } else {
          apiUrl += `&country=${country}`;
          if (category) apiUrl += `&category=${category}`;
        }
        if (q) apiUrl += `&q=${encodeURIComponent(q)}`;
      }

      console.log('NewsAPI URL:', apiUrl);

      const res = await fetch(apiUrl);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`NewsAPI error: ${res.status} - ${errText}`);
      }

      const data = await res.json();

      if (data.status === 'ok' && data.articles?.length > 0) {
        // --- Bulk upsert to prevent duplicates ---
        const bulkOps = data.articles.map((article) => ({
          updateOne: {
            filter: { url: article.url },
            update: {
              $set: {
                ...article,
                fetchedAt: new Date(),
                queryParams: { country, category, q, language, sources, from, to },
              },
            },
            upsert: true,
          },
        }));

        await headlinesCollection.bulkWrite(bulkOps, { ordered: false });

        // Re-fetch after upsert
        articles = await headlinesCollection
          .find(dbQuery)
          .sort({ publishedAt: -1 })
          .toArray();
      }
    }

    return NextResponse.json({
      status: 'ok',
      articles,
      totalResults: articles.length,
    });
  } catch (error) {
    console.error('Backend filter error:', error.message);
    return NextResponse.json({ error: 'Failed to load filtered news' }, { status: 500 });
  }
}
