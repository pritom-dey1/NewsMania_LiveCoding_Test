'use client';

import { motion } from 'framer-motion';

export default function NewsCard({ article }) {
  const {
    title,
    description,
    url,
    urlToImage,
    source,
    publishedAt,
  } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
 
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group block rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b0f1a] to-[#060914] border border-white/10 shadow-lg hover:shadow-2xl"
    >
      <div className="relative h-48 overflow-hidden">
        {urlToImage ? (
          <motion.img
            src={urlToImage}
            alt={title}
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/400x200?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/90 text-white backdrop-blur"
        >
          {source?.name || 'Unknown'}
        </motion.span>
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold text-white mb-3 leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
          {title || 'No Title Available'}
        </h2>

        <p className="text-sm text-gray-400 mb-5 line-clamp-3">
          {description || 'No description available for this article.'}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{formattedDate}</span>

          <motion.span
            whileHover={{ x: 4 }}
            className="text-blue-400 font-medium"
          >
            Read →
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}
