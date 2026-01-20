
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import NewsCard from '@/components/NewsCard';

export default function Results() {
  const searchParams = useSearchParams();

  // All filters from HeroSection
  const country = searchParams.get('country') || 'us';
  const category = searchParams.get('category') || 'general';
  const q = searchParams.get('q') || '';
  const language = searchParams.get('language') || 'en';
  const sources = searchParams.get('sources') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `/api/news?country=${country}&category=${category}&language=${language}`;

      if (q) url += `&q=${encodeURIComponent(q)}`;
      if (sources) url += `&sources=${encodeURIComponent(sources)}`;
      if (from) url += `&from=${from}`;
      if (to) url += `&to=${to}`;

      url += '&page=1&limit=20';

      console.log('Fetching from backend:', url);

      const res = await fetch(url);
      if (!res.ok) throw new Error('Backend fetch failed');

      const data = await res.json();

      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, [country, category, q, language, sources, from, to]);

  let title = 'Top Headlines';
  if (q) title = `Results for "${q}"`;
  else if (category !== 'general') title = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;

  const filtersList = [];
  if (country && country !== 'us') filtersList.push(`Country: ${country.toUpperCase()}`);
  if (language && language !== 'en') filtersList.push(`Language: ${language.toUpperCase()}`);
  if (sources) filtersList.push(`Sources: ${sources}`);
  if (from || to) {
    const dateText = `${from || 'Any start'} → ${to || 'Today'}`;
    filtersList.push(`Date: ${dateText}`);
  }

  const subtitle = filtersList.length > 0 
    ? `Filtered by: ${filtersList.join(' • ')}` 
    : 'Showing latest global headlines';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-b from-[#05070f] to-[#0a0e1f] text-white px-4 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg"
            >
              Loading your news...
            </motion.p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl md:text-3xl font-bold text-red-400 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              {error}
            </p>
            <p className="text-gray-500 mt-4">
              Try adjusting your filters or come back later.
            </p>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <div className="text-6xl mb-6">📰</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4">
              No articles found
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              We couldn&apos;t find any news matching your current filters.
            </p>
            <p className="text-gray-500 mt-4">
              Try removing some filters or searching with different keywords.
            </p>
          </motion.div>
        )}

        {/* News Grid */}
        {!loading && !error && articles.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {articles.map((article, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
                }}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <NewsCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}