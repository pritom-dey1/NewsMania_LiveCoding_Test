'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const router = useRouter();

  const [country, setCountry] = useState('us');
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'in', name: 'India' },
    { code: 'bd', name: 'Bangladesh' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
  ];

  const categories = [
    { code: 'general', name: 'General' },
    { code: 'business', name: 'Business' },
    { code: 'entertainment', name: 'Entertainment' },
    { code: 'health', name: 'Health' },
    { code: 'science', name: 'Science' },
    { code: 'sports', name: 'Sports' },
    { code: 'technology', name: 'Technology' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    let queryParams = `country=${country}&category=${category}`;

    if (searchQuery.trim()) {
      queryParams += `&q=${encodeURIComponent(searchQuery.trim())}`;
    }

    router.push(`/results?${queryParams}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white px-4">
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
      >
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="300" r="300" fill="url(#g)" />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10   text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
        >
          Discover Top News Instantly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-4 max-w-5xl mx-auto"
        >
        Stay informed with a powerful real-time global news experience. Discover breaking headlines as they happen, filter stories by country and category, and search worldwide news instantly — all from one seamless platform designed for speed and clarity.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center justify-center w-fit mx-auto"
        >
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-5 py-3 bg-black/60 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-5 py-3 bg-black/60 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {categories.map((cat) => (
              <option key={cat.code} value={cat.code}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news (optional)"
            className="px-5 py-3 bg-black/60 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
          />

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="px-8 py-3 rounded-xl bg-blue-600 font-semibold hover:bg-blue-700 transition"
          >
            Explore News
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
