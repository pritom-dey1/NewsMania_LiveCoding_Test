
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function HeroSection() {
  const router = useRouter();

  const [country, setCountry] = useState('us');
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [sources, setSources] = useState(''); // e.g., "bbc-news,cnn"
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'it', name: 'Italian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'zh', name: 'Chinese' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    let queryParams = `country=${country}&category=${category}&language=${language}`;

    if (searchQuery.trim()) {
      queryParams += `&q=${encodeURIComponent(searchQuery.trim())}`;
    }
    if (sources.trim()) {
      queryParams += `&sources=${encodeURIComponent(sources.trim())}`;
    }
    if (startDate) {
      queryParams += `&from=${startDate.toISOString().split('T')[0]}`;
    }
    if (endDate) {
      queryParams += `&to=${endDate.toISOString().split('T')[0]}`;
    }

    router.push(`/results?${queryParams}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black text-white px-4 md:px-8">
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 3 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#3b82f6_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#8b5cf6_0%,transparent_50%)]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Discover Top Headlines
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Real-time global news at your fingertips. Filter by country, category, language, date range, sources, or search instantly.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-blue-900/30 flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center"
        >
          {/* Country */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full md:w-auto px-6 py-4 bg-black/40 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-500/50"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code} className="bg-gray-900">
                {c.name}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-auto px-6 py-4 bg-black/40 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-500/50"
          >
            {categories.map((cat) => (
              <option key={cat.code} value={cat.code} className="bg-gray-900">
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-auto px-6 py-4 bg-black/40 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-500/50"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-gray-900">
                {lang.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={sources}
            onChange={(e) => setSources(e.target.value)}
            placeholder="Sources (e.g. bbc-news,cnn)"
            className="w-100 md:flex-1 px-6 py-4 bg-black/40 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-500/50"
          />

          {/* Date Range Pickers */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From Date"
              dateFormat="yyyy-MM-dd"
              className="w-full md:w-40 px-6 py-4 bg-black/40 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To Date"
              dateFormat="yyyy-MM-dd"
              className="w-full md:w-40 px-6 py-4 bg-black/40 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news (optional)"
            className="w-full md:flex-1 px-6 py-4 bg-black/40 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-500/50"
          />

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-semibold text-white shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
          >
            Explore Now
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}