"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../../components/Navigation";

// Sample movie data - in a real app, you'd fetch this from an API
const MOVIE_DATA = {
  id: "6",
  title: "Dune: Part Two",
  tagline: "Long live the fighters.",
  year: "2024",
  contentRating: "PG-13",  // Renamed from "rating" to "contentRating"
  runtime: "166 min",
  director: "Denis Villeneuve",
  posterImage: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  backdropImage: "https://image.tmdb.org/t/p/original/uM3R5uTRRAru7xZeWKUFXEjDpk5.jpg",
  synopsis: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
  releaseDate: "2024-02-27",
  budget: "$190,000,000",
  revenue: "$711,643,354",
  language: "English",
  genres: ["Science Fiction", "Adventure", "Drama"],
  productionCompanies: ["Legendary Pictures", "Warner Bros. Pictures"],
  watched: false,
  liked: false,
  inWatchlist: false,
  userRating: 0,  // Renamed from "rating" to "userRating" to avoid conflict
  cast: [
    {
      id: "1",
      name: "Timothée Chalamet",
      character: "Paul Atreides",
      image: "https://image.tmdb.org/t/p/w500/7dJnUPLkLiWUoWfZlaTNZOH7fNM.jpg"
    },
    {
      id: "2",
      name: "Zendaya",
      character: "Chani",
      image: "https://image.tmdb.org/t/p/w500/6TE2AlOUqcrs7CyJiWYgmzlzMNS.jpg"
    },
    {
      id: "3",
      name: "Rebecca Ferguson",
      character: "Lady Jessica",
      image: "https://image.tmdb.org/t/p/w500/lJloTOheuQSirSLJP7flwX4vfYd.jpg"
    },
    {
      id: "4",
      name: "Austin Butler",
      character: "Feyd-Rautha Harkonnen",
      image: "https://image.tmdb.org/t/p/w500/iiBvWEHGUYK0fpDvfVffSFKC7hk.jpg"
    },
    {
      id: "5",
      name: "Florence Pugh",
      character: "Princess Irulan",
      image: "https://image.tmdb.org/t/p/w500/6Wyc7CeUXuKMPLbcyJBpC9HvTFj.jpg"
    }
  ],
  similarMovies: [
    {
      id: "1",
      title: "Dune",
      year: "2021",
      director: "Denis Villeneuve",
      poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
    },
    {
      id: "2",
      title: "Blade Runner 2049",
      year: "2017",
      director: "Denis Villeneuve",
      poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg"
    },
    {
      id: "3",
      title: "Arrival",
      year: "2016",
      director: "Denis Villeneuve",
      poster: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg"
    },
    {
      id: "4",
      title: "Oppenheimer",
      year: "2023",
      director: "Christopher Nolan",
      poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
    },
    {
      id: "5",
      title: "The Batman",
      year: "2022",
      director: "Matt Reeves",
      poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
    }
  ]
};

// Main tabs for movie details
const TABS = [
  { id: "cast", label: "Top Cast" },
  { id: "crew", label: "Top Crew" },
  { id: "genre", label: "Genre" },
  { id: "awards", label: "Awards" }
];

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState(MOVIE_DATA);
  const [activeTab, setActiveTab] = useState("cast");
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Track scroll position for parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle user interactions
  const toggleWatched = () => {
    setMovie({ ...movie, watched: !movie.watched });
  };

  const toggleLiked = () => {
    setMovie({ ...movie, liked: !movie.liked });
  };

  const toggleWatchlist = () => {
    setMovie({ ...movie, inWatchlist: !movie.inWatchlist });
  };

  const setUserRating = (rating: number) => {
    setMovie({ ...movie, userRating: rating });  // Changed from rating: rating
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0f0517] via-[#120823] to-[#0a0417] text-white">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0f0517] z-50">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {/* Hero Section with Backdrop */}
          <div className="relative h-[80vh]">
            {/* Backdrop Image with Parallax Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{
                  backgroundImage: `url(${movie.backdropImage})`,
                  transform: `translateY(${scrollPosition * 0.2}px)`,
                  height: `calc(100% + ${scrollPosition * 0.4}px)`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0517] via-[#0f0517]/80 to-[#0f0517]/60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0517] via-[#120823]/90 to-transparent"></div>
            </div>

            {/* Navigation */}
            <Navigation />

            {/* Movie Info Section */}
            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-10">
              <div className="flex flex-col md:flex-row gap-8 items-end">
                {/* Movie Poster */}
                <motion.div 
                  className="hidden md:block w-56 md:w-64 flex-shrink-0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="movie-poster-container">
                    <Image
                      src={movie.posterImage}
                      alt={movie.title}
                      width={250}
                      height={375}
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </motion.div>

                {/* Movie Info */}
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.h1 
                    className="text-4xl md:text-5xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {movie.title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg text-purple-300 italic mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {movie.tagline}
                  </motion.p>

                  <motion.div 
                    className="flex flex-wrap gap-4 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="movie-info-pill">{movie.year}</div>
                    <div className="movie-info-pill">{movie.contentRating}</div>
                    <div className="movie-info-pill">{movie.runtime}</div>
                  </motion.div>

                  <motion.div 
                    className="flex gap-3 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <button 
                      className={`action-button ${movie.watched ? 'active' : ''}`}
                      onClick={toggleWatched}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={movie.watched ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Watched</span>
                    </button>
                    
                    <button 
                      className={`action-button ${movie.liked ? 'liked' : ''}`}
                      onClick={toggleLiked}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={movie.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span>Like</span>
                    </button>
                    
                    <button 
                      className={`action-button ${movie.inWatchlist ? 'in-list' : ''}`}
                      onClick={toggleWatchlist}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        {movie.inWatchlist && <line x1="7" y1="12" x2="17" y2="12" strokeWidth="2" />}
                      </svg>
                      <span>{movie.inWatchlist ? 'In Watchlist' : 'Add to List'}</span>
                    </button>
                  </motion.div>

                  {/* Rating Stars */}
                  <motion.div 
                    className="flex items-center gap-2 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="stars-container">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          className={`star-rating ${movie.userRating >= star ? 'active' : ''}`}
                          onClick={() => setUserRating(star)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={movie.userRating >= star ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-purple-300">
                      {movie.userRating > 0 ? `Your rating: ${movie.userRating}/5` : 'Rate this movie'}
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="md:col-span-2">
                {/* Synopsis */}
                <motion.section 
                  className="mb-12"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                  <p className="text-lg leading-relaxed text-purple-100">{movie.synopsis}</p>
                </motion.section>

                {/* Tabs Section */}
                <motion.section 
                  className="mb-12"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <div className="tabs-container mb-6">
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "cast" && (
                        <motion.div 
                          className="cast-grid"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {movie.cast.map((person) => (
                            <motion.div 
                              key={person.id} 
                              className="cast-card"
                              variants={itemFadeIn}
                              whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                              <Link href={`/actors/${person.id}`}>
                                <div className="cast-image-container">
                                  <Image
                                    src={person.image}
                                    alt={person.name}
                                    width={120}
                                    height={180}
                                    className="cast-image"
                                  />
                                </div>
                                <div className="cast-info">
                                  <h3 className="cast-name">{person.name}</h3>
                                  <p className="cast-character">{person.character}</p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {activeTab === "crew" && (
                        <div className="crew-content">
                          <div className="crew-item">
                            <span className="crew-role">Director</span>
                            <span className="crew-name">{movie.director}</span>
                          </div>
                          <div className="crew-item">
                            <span className="crew-role">Writer</span>
                            <span className="crew-name">Jon Spaihts, Denis Villeneuve, Frank Herbert (novel)</span>
                          </div>
                          <div className="crew-item">
                            <span className="crew-role">Cinematography</span>
                            <span className="crew-name">Greig Fraser</span>
                          </div>
                          <div className="crew-item">
                            <span className="crew-role">Composer</span>
                            <span className="crew-name">Hans Zimmer</span>
                          </div>
                        </div>
                      )}

                      {activeTab === "genre" && (
                        <div className="genre-content">
                          <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre, index) => (
                              <Link href={`/genre/${genre.toLowerCase().replace(' ', '-')}`} key={index}>
                                <div className="genre-pill">
                                  {genre}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === "awards" && (
                        <div className="awards-content">
                          <div className="award-item">
                            <div className="award-icon">🏆</div>
                            <div className="award-details">
                              <h3 className="award-title">Academy Awards</h3>
                              <p className="award-description">Best Cinematography, Best Visual Effects, Best Production Design</p>
                            </div>
                          </div>
                          <div className="award-item">
                            <div className="award-icon">🎬</div>
                            <div className="award-details">
                              <h3 className="award-title">BAFTA Awards</h3>
                              <p className="award-description">Best Cinematography, Best Special Visual Effects</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.section>

                {/* Similar Films Section */}
                <motion.section
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Similar Films</h2>
                    <Link href="/similar-movies" className="text-purple-400 hover:text-purple-300 text-sm">
                      View All Similar Films →
                    </Link>
                  </div>

                  <motion.div 
                    className="similar-films-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {movie.similarMovies.map((similarMovie, index) => (
                      <motion.div 
                        key={similarMovie.id} 
                        className="similar-movie-card"
                        variants={itemFadeIn}
                        whileHover={{ 
                          y: -8, 
                          transition: { duration: 0.2 } 
                        }}
                      >
                        <Link href={`/movie/${similarMovie.id}`}>
                          <div className="similar-movie-poster">
                            <Image
                              src={similarMovie.poster}
                              alt={similarMovie.title}
                              width={180}
                              height={270}
                              className="rounded-lg"
                            />
                          </div>
                          <h3 className="similar-movie-title">{similarMovie.title}</h3>
                          <p className="similar-movie-year">{similarMovie.year}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              </div>

              {/* Right Column - Info Card */}
              <motion.div 
                className="md:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="movie-info-card">
                  <div className="movie-info-section">
                    <h3 className="movie-info-title">Director</h3>
                    <Link href={`/person/${movie.director.toLowerCase().replace(' ', '-')}`} className="movie-info-value director-link">
                      {movie.director}
                    </Link>
                  </div>
                  
                  <div className="movie-info-section">
                    <h3 className="movie-info-title">Release Date</h3>
                    <p className="movie-info-value">{movie.releaseDate}</p>
                  </div>
                  
                  <div className="movie-info-section">
                    <h3 className="movie-info-title">Budget</h3>
                    <p className="movie-info-value">{movie.budget}</p>
                  </div>
                  
                  <div className="movie-info-section">
                    <h3 className="movie-info-title">Revenue</h3>
                    <p className="movie-info-value">{movie.revenue}</p>
                  </div>
                  
                  <div className="movie-info-section">
                    <h3 className="movie-info-title">Original Language</h3>
                    <p className="movie-info-value">{movie.language}</p>
                  </div>

                  <div className="movie-info-section">
                    <h3 className="movie-info-title">Production</h3>
                    <div className="flex flex-col gap-1">
                      {movie.productionCompanies.map((company, index) => (
                        <p key={index} className="movie-info-value">{company}</p>
                      ))}
                    </div>
                  </div>

                  <div className="movie-share-section">
                    <h3 className="movie-info-title mb-3">Share</h3>
                    <div className="flex gap-3">
                      <button className="share-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </button>
                      <button className="share-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </button>
                      <button className="share-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </button>
                      <button className="share-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        .loader {
          border: 4px solid rgba(126, 34, 206, 0.3);
          border-radius: 50%;
          border-top: 4px solid rgba(168, 85, 247, 0.8);
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .movie-poster-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transform: translateY(20px);
        }

        .movie-info-pill {
          display: inline-flex;
          padding: 4px 12px;
          background-color: rgba(76, 29, 149, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 20px;
          font-size: 14px;
          color: rgba(221, 214, 254, 0.9);
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background-color: rgba(76, 29, 149, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 8px;
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .action-button:hover {
          background-color: rgba(126, 34, 206, 0.4);
          transform: translateY(-2px);
        }

        .action-button.active {
          background-color: rgba(76, 29, 149, 0.5);
          border-color: rgba(126, 34, 206, 0.6);
          color: rgba(192, 132, 252, 1);
        }

        .action-button.liked {
          background-color: rgba(236, 72, 153, 0.3);
          border-color: rgba(236, 72, 153, 0.5);
          color: rgba(249, 168, 212, 1);
        }

        .action-button.in-list {
          background-color: rgba(16, 185, 129, 0.3);
          border-color: rgba(16, 185, 129, 0.5);
          color: rgba(110, 231, 183, 1);
        }

        .stars-container {
          display: flex;
          gap: 2px;
        }

        .star-rating {
          color: rgba(168, 85, 247, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .star-rating:hover {
          transform: scale(1.1);
          color: rgba(168, 85, 247, 0.8);
        }

        .star-rating.active {
          color: rgba(168, 85, 247, 1);
        }

        .tabs-container {
          display: flex;
          gap: 2px;
          background-color: rgba(76, 29, 149, 0.2);
          padding: 3px;
          border-radius: 8px;
          width: fit-content;
        }

        .tab-button {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tab-button:hover {
          color: rgba(192, 132, 252, 1);
        }

        .tab-button.active {
          background-color: rgba(126, 34, 206, 0.4);
          color: white;
        }

        .cast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 20px;
        }

        .cast-card {
          background-color: rgba(76, 29, 149, 0.2);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .cast-image-container {
          overflow: hidden;
        }

        .cast-image {
          width: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .cast-card:hover .cast-image {
          transform: scale(1.05);
        }

        .cast-info {
          padding: 10px;
        }

        .cast-name {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .cast-character {
          font-size: 12px;
          color: rgba(192, 132, 252, 0.8);
        }

        .crew-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .crew-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(76, 29, 149, 0.3);
        }

        .crew-role {
          font-size: 14px;
          color: rgba(192, 132, 252, 0.8);
        }

        .crew-name {
          font-weight: 500;
        }

        .genre-pill {
          display: inline-flex;
          padding: 6px 14px;
          background-color: rgba(76, 29, 149, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 20px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .genre-pill:hover {
          background-color: rgba(126, 34, 206, 0.4);
          transform: translateY(-2px);
        }

        .awards-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .award-item {
          display: flex;
          gap: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(76, 29, 149, 0.3);
        }

        .award-icon {
          font-size: 24px;
        }

        .award-title {
          font-weight: 500;
          margin-bottom: 4px;
        }

        .award-description {
          font-size: 14px;
          color: rgba(192, 132, 252, 0.8);
        }

        .similar-films-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
        }

        .similar-movie-card {
          transition: all 0.3s ease;
        }

        .similar-movie-poster {
          margin-bottom: 8px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .similar-movie-title {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .similar-movie-year {
          font-size: 12px;
          color: rgba(192, 132, 252, 0.8);
        }

        .movie-info-card {
          background-color: rgba(76, 29, 149, 0.2);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .movie-info-section {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(76, 29, 149, 0.3);
        }

        .movie-info-section:last-child,
        .movie-share-section {
          border-bottom: none;
          padding-bottom: 0;
        }

        .movie-info-title {
          font-size: 14px;
          color: rgba(192, 132, 252, 0.8);
          margin-bottom: 8px;
        }

        .movie-info-value {
          font-weight: 500;
        }

        .director-link {
          color: rgba(168, 85, 247, 1);
          transition: all 0.2s ease;
        }

        .director-link:hover {
          text-decoration: underline;
        }

        .share-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(76, 29, 149, 0.3);
          transition: all 0.3s ease;
        }

        .share-button:hover {
          background-color: rgba(126, 34, 206, 0.5);
          transform: translateY(-2px);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}