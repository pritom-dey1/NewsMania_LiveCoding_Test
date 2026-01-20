'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import NewsCard from '@/components/NewsCard';

export default function Results() {
  const searchParams = useSearchParams();

  const country = searchParams.get('country') || 'us';
  const category = searchParams.get('category') || 'general';
  const q = searchParams.get('q') || '';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `/api/news?country=${country}&category=${category}`;
        if (q) url += `&q=${encodeURIComponent(q)}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch news');

        const data = await res.json();
        if (data.status !== 'ok') throw new Error(data.message || 'API Error');

        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country, category, q]);

  const headerTitle = q
    ? `Search results for “${q}”`
    : `Top ${category.charAt(0).toUpperCase() + category.slice(1)} news`;

  const headerSubtitle = `Country: ${country.toUpperCase()}`;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#05070f] text-white px-4 py-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {headerTitle}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {headerSubtitle}
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24 text-gray-400">
            Fetching latest headlines…
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-24 text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            No news articles found for this filter.
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && articles.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
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
