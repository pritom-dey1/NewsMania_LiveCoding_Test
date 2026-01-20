# News Portal Project

This is a **Next.js 13+ project** built as part of a **live coding test**.  

The project focuses on creating a **dynamic news portal** with the following features:

## Key Features

- **Real-time news filtering** by:
  - Country
  - Category
  - Search query
  - Language
  - Sources
  - Date range (from/to)

- **Interactive UI**:
  - Animated hero section
  - Smooth card animations with hover effects
  - Dark theme support
  - Responsive layout for desktop and mobile

- **Backend & API**:
  - Next.js API routes for fetching and filtering news
  - Cached news stored in MongoDB to avoid duplicate API calls
  - Duplicate-proof mechanism for stored articles
  - Smart use of **NewsAPI**:
    - `top-headlines` endpoint for standard country/category filters
    - `everything` endpoint for language-specific searches
    - Automatic fallback keyword for language-only searches

- **Frontend Experience**:
  - Animated news cards using Framer Motion
  - Line-clamped text for uniform card height
  - Real-time filtering without page reload
  - Dynamic display of selected category or search query

## Purpose

This project was created to demonstrate **full-stack web development skills** in a live coding test environment, focusing on:

- React/Next.js frontend development
- Backend API handling and caching
- UI/UX design with animations
- Best practices for API integration and database management

## Tech Stack

- **Frontend:** Next.js 13+, React, Tailwind CSS, Framer Motion  
- **Backend:** Next.js API routes, Node.js  
- **Database:** MongoDB  
- **External APIs:** NewsAPI  

---

**Note:** This project is designed to handle **real-world news filtering** with multiple parameters while maintaining performance and preventing duplicate entries in the database.
