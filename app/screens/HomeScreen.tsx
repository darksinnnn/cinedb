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
        </div>
      </Link>
    </motion.div>
  );
};

const PopularListItem = ({ item, index }: { item: any; index: number }) => {
  return (
    <motion.div
      className="list-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ x: 5, backgroundColor: "#341e70" }}
    >
      <Link href={`/list/${item.id}`} className="list-item-content">
        <div className="list-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
          </svg>
        </div>
        <span className="list-title">{item.title}</span>
        <div className="list-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-gray-950 text-white">
      {/* Hero Section with Animation */}
      <div className="relative w-full h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-purple-900 z-10"></div>
        <div className="hero-background absolute inset-0"></div>

        {/* Pass setIsMenuOpen to Navigation component */}
        <Navigation setIsMenuOpen={setIsMenuOpen} />

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

      {/* All Films & TV Section */}
      <div className="container mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold mb-6">All Films & TV</h2>

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
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 pb-20">
        {/* Currently in Cinemas Section */}
        <section className="mt-8">
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

        {/* Trending Now Section */}
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

        {/* Popular Lists Section */}
        <section className="mt-16 flex flex-col md:flex-row md:justify-between">
          <motion.h2
            className="text-2xl font-bold mb-6 md:mb-0 md:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Popular Lists
          </motion.h2>

          <div className="list-container md:w-3/4">
            {POPULAR_LISTS.map((item, index) => (
              <PopularListItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-purple-950 py-8 text-center text-purple-300 text-sm">
        <div className="container mx-auto px-8">
          <p>© 2025 CineDB. All rights reserved.</p>
        </div>
      </footer>

      {/* Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
          ></motion.div>

          <motion.div
            className="menu-content"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="menu-header">
              <h3 className="text-xl font-bold">Menu</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="close-button"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>

            <div className="profile-section">
              <div className="profile-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="profile-name">Guest User</h3>
              <Link
                href="/profile"
                className="profile-button"
                onClick={() => setIsMenuOpen(false)}
              >
                View Profile
              </Link>
            </div>

            <nav className="menu-nav">
              <Link
                href="/"
                className="menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </Link>

              <Link
                href="/movies"
                className="menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="2.18"
                    ry="2.18"
                  ></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>
                <span>Movies</span>
              </Link>

              <Link
                href="/actors"
                className="menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Actors</span>
              </Link>

              <Link
                href="/genres"
                className="menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 14 4 9l5-5"></path>
                  <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"></path>
                </svg>
                <span>Genres</span>
              </Link>

              <Link
                href="/watchlist"
                className="menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Watchlist</span>
              </Link>

              <Link
                href="/settings"
                className="menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Settings</span>
              </Link>
            </nav>

            <button className="logout-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff4081"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Log Out</span>
            </button>
          </motion.div>
        </div>
      )}

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

        .header-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(88, 28, 135, 0.15);
          color: white;
          transition: all 0.3s ease;
        }

        .header-icon:hover {
          background-color: rgba(88, 28, 135, 0.35);
          transform: scale(1.1);
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

        .list-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }

        .list-item {
          background: linear-gradient(to right, #240f53, #2d1a69);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .list-item-content {
          display: flex;
          align-items: center;
          padding: 16px;
          width: 100%;
          color: white;
          text-decoration: none;
        }

        .list-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #341e70;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .list-title {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
        }

        .list-arrow {
          margin-left: 8px;
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

        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(3px);
          z-index: 50;
        }

        .menu-content {
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          height: 100%;
          background: linear-gradient(135deg, #240f53, #1a0a38);
          padding: 24px;
          display: flex;
          flex-direction: column;
          z-index: 51;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 640px) {
          .menu-content {
            width: 75%;
          }
        }

        .menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }

        .profile-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #341e70;
          margin-bottom: 16px;
        }

        .profile-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .profile-button {
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(to right, #4c1d95, #5b21b6);
          color: white;
          border-radius: 20px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .profile-button:hover {
          background: linear-gradient(to right, #5b21b6, #6d28d9);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .menu-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 40px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          color: white;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .menu-item:hover {
          transform: translateX(5px);
        }

        .menu-item span {
          margin-left: 16px;
          font-size: 16px;
        }

        .logout-button {
          display: flex;
          align-items: center;
          margin-top: auto;
          margin-bottom: 60px; /* Significantly increased bottom margin */
          padding: 12px 0;
          background: none;
          border: none;
          color: #ff4081;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
        }

        .logout-button:hover {
          color: #ff6b9f;
          transform: translateX(5px);
          transition: all 0.2s ease;
        }

        .logout-button span {
          margin-left: 16px;
        }
      `}</style>
    </main>
  );
}
