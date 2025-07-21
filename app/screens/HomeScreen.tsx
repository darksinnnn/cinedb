"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";

// Sample movie data - keeping your real movie data
const CURRENTLY_IN_CINEMAS = [
  {
    id: "3",
    title: "Deadpool & Wolverine",
    director: "Shawn Levy",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/aTvePCU7exLepwg5hWySjwxojQK.jpg",
  },
  {
    id: "4",
    title: "Inside Out 2",
    director: "Kelsey Mann",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/tu6yZMlp0tY3dwIHgL0QnG7f0U2.jpg",
  },
  {
    id: "5",
    title: "Twisters",
    director: "Lee Isaac Chung",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    id: "6",
    title: "Dune: Part Two",
    director: "Denis Villeneuve",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  },
  {
    id: "7",
    title: "Kung Fu Panda 4",
    director: "Mike Mitchell",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
  },
  {
    id: "8",
    title: "The Fall Guy",
    director: "David Leitch",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/6OnoMgGFuZ921eV8v8yEyXoag1r.jpg",
  },
  {
    id: "9",
    title: "Kingdom of the Planet of the Apes",
    director: "Wes Ball",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/5uD4dxNX8WGdXjzzcрумuJkL9zQ.jpg",
  },
];

const TRENDING_NOW = [
  {
    id: "1",
    title: "Dune: Part Two",
    director: "Denis Villeneuve",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  },
  {
    id: "2",
    title: "Oppenheimer",
    director: "Christopher Nolan",
    year: "2023",
    poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
  },
  {
    id: "3",
    title: "Spider-Man: Across the Spider-Verse",
    director: "Joaquim Dos Santos",
    year: "2023",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  },
  {
    id: "10",
    title: "Godzilla x Kong: The New Empire",
    director: "Adam Wingard",
    year: "2024",
    poster: "https://image.tmdb.org/t/p/w500/kgGM3kWUAoQWGRnkfwUm2HNSLpx.jpg",
  },
  {
    id: "11",
    title: "Poor Things",
    director: "Yorgos Lanthimos",
    year: "2023",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
  },
  {
    id: "12",
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: "1994",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },
  {
    id: "13",
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
];

const POPULAR_LISTS = [
  {
    id: "1",
    title: "Mind-Bending Sci-Fi",
  },
  {
    id: "2",
    title: "90s Crime Classics",
  },
  {
    id: "3",
    title: "Animated Masterpieces",
  },
  {
    id: "4",
    title: "Oscar Winners",
  },
  {
    id: "5",
    title: "Best of 2024",
  },
];

const ALL_FILTERS = [
  { name: "All", value: "all" },
  { name: "Genre", value: "genre" },
  { name: "Year", value: "year" },
  { name: "Country", value: "country" },
  { name: "Director", value: "director" },
  { name: "Rating", value: "rating" },
  { name: "Runtime", value: "runtime" },
];

// Revised MovieCard component for HomeScreen.tsx
const MovieCard = ({ movie, index }: { movie: any; index: number }) => {
  return (
    <motion.div
      className="movie-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Link href={`/movie/${movie.id}`}>
        <div className="movie-poster-container">
          <Image
            src={movie.poster}
            alt={movie.title}
            width={240}
            height={360}
            className="movie-poster"
          />
          <div className="movie-overlay">
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-details">
                {movie.year} • dir. {movie.director}
              </p>
            </div>
          </div>
          
          <div className="movie-actions">
            <button className="movie-action-btn" title="Watched">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button className="movie-action-btn" title="Like">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button className="movie-action-btn" title="Rate">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
            <button className="movie-action-btn" title="Add to Watchlist">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Updated PopularListItem component for HomeScreen.tsx
const PopularListItem = ({ item, index }: { item: any; index: number }) => {
  // Sample poster URLs for each list
  const samplePosters = [
    [
      "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
      "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
    ]
  ];
  
  // Use modulo to cycle through the sample posters array
  const posterSet = samplePosters[0];
  
  return (
    <motion.div
      className="list-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/list/${item.id}`}>
        <div className="list-poster-grid">
          {posterSet.map((poster, i) => (
            <div key={i} className="list-poster-item">
              <Image
                src={poster}
                alt=""
                width={100}
                height={150}
                className="list-poster"
              />
            </div>
          ))}
        </div>
        <div className="list-overlay">
          <h3 className="list-title">{item.title}</h3>
        </div>
      </Link>
    </motion.div>
  );
};

const FilterButton = ({ name }: { name: string }) => (
  <div className="filter-button">
    <span>{name}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </div>
);

export default function HomeScreen() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeSliderRow, setActiveSliderRow] = useState(null);

  const cinemaSwiperRef = useRef<HTMLDivElement>(null);
  const trendingSwiperRef = useRef<HTMLDivElement>(null);

  // Automatic slider for Currently in Cinemas section
  useEffect(() => {
    const interval = setInterval(() => {
      if (cinemaSwiperRef.current) {
        const containerWidth = cinemaSwiperRef.current.offsetWidth;
        const cardWidth = 180; // Approximate card width with margin
        const currentScroll = cinemaSwiperRef.current.scrollLeft;
        const maxScroll = cinemaSwiperRef.current.scrollWidth - containerWidth;

        // Calculate next scroll position
        let nextScroll = currentScroll + cardWidth;

        // Reset if we reach the end
        if (nextScroll >= maxScroll - 50) {
          nextScroll = 0;
        }

        cinemaSwiperRef.current.scrollTo({
          left: nextScroll,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0517] via-[#120823] to-[#0a0417] text-white">
      {/* Hero Section with Animation */}
      <div className="relative w-full h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120823]/30 to-[#0f0517] z-10"></div>
        <div className="hero-background absolute inset-0"></div>

        {/* Updated Navigation without hamburger */}
        <Navigation />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-8 pt-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Discover Great Cinema
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            Explore the world of films, share your thoughts, and connect with movie
            lovers
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link href="/search" className="cta-button">
              Find Movies
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Reordered as requested */}
      <div className="container mx-auto px-8 pb-20">
        {/* 1. Currently in Cinemas Section */}
        <section className="mt-16">
          <motion.h2
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Currently In Cinemas
          </motion.h2>

          <div className="movies-slider-container" ref={cinemaSwiperRef}>
            <div className="movies-slider">
              {CURRENTLY_IN_CINEMAS.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>

            <div className="slider-controls">
              <button
                className="slider-arrow slider-prev"
                onClick={() => {
                  if (cinemaSwiperRef.current) {
                    cinemaSwiperRef.current.scrollBy({
                      left: -200,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                className="slider-arrow slider-next"
                onClick={() => {
                  if (cinemaSwiperRef.current) {
                    cinemaSwiperRef.current.scrollBy({
                      left: 200,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Trending Now Section */}
        <section className="mt-16">
          <motion.h2
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trending Now
          </motion.h2>

          <div className="movies-slider-container" ref={trendingSwiperRef}>
            <div className="movies-slider">
              {TRENDING_NOW.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>

            <div className="slider-controls">
              <button
                className="slider-arrow slider-prev"
                onClick={() => {
                  if (trendingSwiperRef.current) {
                    trendingSwiperRef.current.scrollBy({
                      left: -200,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                className="slider-arrow slider-next"
                onClick={() => {
                  if (trendingSwiperRef.current) {
                    trendingSwiperRef.current.scrollBy({
                      left: 200,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Popular Lists Section - Redesigned with movie posters */}
        <section className="mt-16">
          <motion.h2
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Popular Lists
          </motion.h2>

          <div className="popular-lists-grid">
            {POPULAR_LISTS.map((item, index) => (
              <PopularListItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* 4. All Films & TV Section - Moved to the bottom */}
        <section className="mt-16">
          <motion.h2
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            All Films & TV
          </motion.h2>

          <div className="filters-container mb-8">
            {ALL_FILTERS.map((filter, index) => (
              <FilterButton key={index} name={filter.name} />
            ))}
          </div>

          <div className="all-films-grid">
            {TRENDING_NOW.slice(0, 5).map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0417] py-8 text-center text-purple-300 text-sm">
        <div className="container mx-auto px-8">
          <p>© 2025 CineDB. All rights reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
        }

        .hero-background {
          background-image: url("https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg");
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        .hero-text {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        .nav-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(76, 29, 149, 0.3);
          transition: all 0.3s ease;
        }

        .nav-link:hover .nav-icon-container {
          background-color: rgba(126, 34, 206, 0.5);
          transform: scale(1.1);
        }
          
        .profile-avatar-small {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(126, 34, 206, 0.6);
          transition: all 0.3s ease;
        }

        .profile-avatar-small:hover {
          border-color: rgba(168, 85, 247, 0.8);
          transform: scale(1.05);
        }

        .suggest-button {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background-color: rgba(88, 28, 135, 0.25);
          color: white;
          font-weight: 600;
          border-radius: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .suggest-button:hover {
          background-color: rgba(107, 33, 168, 0.4);
          transform: translateY(-2px);
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(45deg, #4c1d95, #7e22ce, #a78bfa);
          color: white;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.35);
          background: linear-gradient(45deg, #581c87, #7e22ce, #a78bfa);
        }

        .movies-slider-container {
          position: relative;
          overflow: hidden;
        }

        .movies-slider {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding: 10px 0;
          scroll-behavior: smooth;
        }

        .movies-slider::-webkit-scrollbar {
          display: none;
        }

        .slider-controls {
          display: flex;
          justify-content: space-between;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 5;
        }

        .slider-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: auto;
        }

        .movies-slider-container:hover .slider-arrow {
          opacity: 0.8;
        }

        .slider-arrow:hover {
          opacity: 1;
          background-color: rgba(88, 28, 135, 0.8);
        }

        .slider-prev {
          margin-left: 10px;
        }

        .slider-next {
          margin-right: 10px;
        }

        .movie-card {
          min-width: 160px;
          max-width: 180px;
          border-radius: 12px;
          overflow: hidden;
          background-color: #2d1e63;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          scroll-snap-align: start;
        }

        .movie-poster-container {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 2/3;
        }

        .movie-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .movie-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(76, 29, 149, 0.5), transparent);
          padding: 20px 16px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          opacity: 0;
        }

        .movie-card:hover .movie-overlay {
          transform: translateY(0);
          opacity: 1;
        }

        .movie-card:hover .movie-poster {
          transform: scale(1.05);
        }

        .movie-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: white;
        }

        .movie-details {
          font-size: 12px;
          color: #a78bfa;
        }

        /* New styles for movie action buttons */
        .movie-actions {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .movie-card:hover .movie-actions {
          opacity: 1;
        }

        .movie-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(15, 5, 23, 0.7);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          border: 1px solid rgba(126, 34, 206, 0.3);
        }

        .movie-action-btn:hover {
          background-color: rgba(126, 34, 206, 0.8);
          transform: scale(1.1);
        }

        /* Styles for the new Popular Lists grid */
        .popular-lists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .list-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 16/9;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .list-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        .list-poster-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          height: 100%;
          width: 100%;
        }

        .list-poster-item {
          overflow: hidden;
          position: relative;
        }

        .list-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .list-card:hover .list-poster {
          transform: scale(1.05);
        }

        .list-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 5, 23, 0.9), rgba(15, 5, 23, 0.5) 50%, transparent);
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }

        .list-title {
          font-size: 18px;
          font-weight: 600;
          color: white;
        }

        .filters-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: linear-gradient(to right, #2d1a69, #341e70);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .filter-button:hover {
          background: linear-gradient(to right, #341e70, #3d208a);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .all-films-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }
      `}</style>
    </main>
  );
}
