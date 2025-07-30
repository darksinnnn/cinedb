"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../components/Navigation";

// Define interfaces
interface Movie {
  id: string;
  title: string;
  year: string;
  director: string;
  poster: string;
  overview: string;
  genres: string[];
}

interface SuggestionResult {
  type: "movie" | "tv";
  item: Movie;
  similarItems?: Movie[];
}

// Sample movie and TV data for demonstration
const SAMPLE_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Dune: Part Two",
    year: "2024",
    director: "Denis Villeneuve",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    genres: ["Science Fiction", "Adventure", "Drama"]
  },
  {
    id: "2",
    title: "Oppenheimer",
    year: "2023",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    genres: ["Drama", "History", "Thriller"]
  },
  {
    id: "3",
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    director: "Joaquim Dos Santos",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    genres: ["Animation", "Action", "Adventure"]
  },
  {
    id: "4",
    title: "Poor Things",
    year: "2023",
    director: "Yorgos Lanthimos",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    overview: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.",
    genres: ["Science Fiction", "Comedy", "Romance"]
  },
  {
    id: "5",
    title: "Blade Runner 2049",
    year: "2017",
    director: "Denis Villeneuve",
    poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
    genres: ["Science Fiction", "Drama", "Mystery"]
  }
];

const SAMPLE_TV_SHOWS: Movie[] = [
  {
    id: "101",
    title: "Stranger Things",
    year: "2016-Present",
    director: "The Duffer Brothers",
    poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    genres: ["Drama", "Fantasy", "Horror"]
  },
  {
    id: "102",
    title: "The Last of Us",
    year: "2023-Present",
    director: "Craig Mazin, Neil Druckmann",
    poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    overview: "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.",
    genres: ["Drama", "Action", "Adventure"]
  },
  {
    id: "103",
    title: "Succession",
    year: "2018-2023",
    director: "Jesse Armstrong",
    poster: "https://image.tmdb.org/t/p/w500/e9Vg3NFvDvXXvJXu5vHhRyYGjcN.jpg",
    overview: "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.",
    genres: ["Drama", "Comedy"]
  },
  {
    id: "104",
    title: "The Bear",
    year: "2022-Present",
    director: "Christopher Storer",
    poster: "https://image.tmdb.org/t/p/w500/8njgO3UhjrVmJGKGOgP30wMUU1Q.jpg",
    overview: "A young chef from the fine dining world returns to Chicago to run his family's sandwich shop after the death of his brother.",
    genres: ["Drama", "Comedy"]
  },
  {
    id: "105",
    title: "Severance",
    year: "2022-Present",
    director: "Ben Stiller, Dan Erickson",
    poster: "https://image.tmdb.org/t/p/w500/u2VYKvP9qsNvfIKmzjqNUvDQlbq.jpg",
    overview: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives; when a mysterious colleague appears outside of work, it begins a journey to discover the truth.",
    genres: ["Drama", "Mystery", "Science Fiction"]
  }
];

export default function SuggestPage() {
  const [suggestionType, setSuggestionType] = useState<"random-movie" | "random-tv" | "custom" | null>(null);
  const [customQuery, setCustomQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestionResult, setSuggestionResult] = useState<SuggestionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Reset result when changing suggestion type
  useEffect(() => {
    setSuggestionResult(null);
    setError(null);
  }, [suggestionType]);

  const getRandomMovie = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * SAMPLE_MOVIES.length);
      const randomMovie = SAMPLE_MOVIES[randomIndex];
      
      // Get similar movies (excluding the suggested one)
      const similarMovies = SAMPLE_MOVIES
        .filter(movie => 
          movie.id !== randomMovie.id && 
          movie.genres.some(genre => randomMovie.genres.includes(genre))
        )
        .slice(0, 3);
      
      setSuggestionResult({
        type: "movie",
        item: randomMovie,
        similarItems: similarMovies
      });
      setIsLoading(false);
    }, 1000);
  };

  const getRandomTVShow = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * SAMPLE_TV_SHOWS.length);
      const randomShow = SAMPLE_TV_SHOWS[randomIndex];
      
      // Get similar shows (excluding the suggested one)
      const similarShows = SAMPLE_TV_SHOWS
        .filter(show => 
          show.id !== randomShow.id && 
          show.genres.some(genre => randomShow.genres.includes(genre))
        )
        .slice(0, 3);
      
      setSuggestionResult({
        type: "tv",
        item: randomShow,
        similarItems: similarShows
      });
      setIsLoading(false);
    }, 1000);
  };

  const getCustomSuggestion = () => {
    if (!customQuery.trim()) {
      setError("Please enter a movie or TV show title");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Add to search history
    setSearchHistory(prev => {
      const newHistory = [customQuery, ...prev];
      return newHistory.slice(0, 5); // Keep only the last 5 searches
    });
    
    // Simulate API call delay
    setTimeout(() => {
      // Search in both movies and TV shows
      const allItems = [...SAMPLE_MOVIES, ...SAMPLE_TV_SHOWS];
      const foundItem = allItems.find(item => 
        item.title.toLowerCase().includes(customQuery.toLowerCase())
      );
      
      if (foundItem) {
        const type = SAMPLE_MOVIES.some(movie => movie.id === foundItem.id) ? "movie" : "tv";
        const sourceArray = type === "movie" ? SAMPLE_MOVIES : SAMPLE_TV_SHOWS;
        
        // Get similar items
        const similarItems = sourceArray
          .filter(item => 
            item.id !== foundItem.id && 
            item.genres.some(genre => foundItem.genres.includes(genre))
          )
          .slice(0, 3);
        
        setSuggestionResult({
          type,
          item: foundItem,
          similarItems
        });
      } else {
        setError(`No matches found for "${customQuery}"`);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getCustomSuggestion();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0517] via-[#120823] to-[#0a0417] text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="suggest-container"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Suggest Me Something
            </motion.h1>
            <motion.p
              className="text-lg text-purple-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover your next favorite movie or show
            </motion.p>
          </div>

          <div className="option-cards">
            <motion.div 
              className={`option-card ${suggestionType === 'random-movie' ? 'selected' : ''}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setSuggestionType('random-movie');
                getRandomMovie();
              }}
            >
              <div className="option-icon">🎬</div>
              <h3>Random Movie</h3>
              <p>Get a random movie suggestion</p>
            </motion.div>

            <motion.div 
              className={`option-card ${suggestionType === 'random-tv' ? 'selected' : ''}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setSuggestionType('random-tv');
                getRandomTVShow();
              }}
            >
              <div className="option-icon">📺</div>
              <h3>Random TV Show</h3>
              <p>Get a random TV show suggestion</p>
            </motion.div>

            <motion.div 
              className={`option-card ${suggestionType === 'custom' ? 'selected' : ''}`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSuggestionType('custom')}
            >
              <div className="option-icon">🔍</div>
              <h3>Custom Suggestion</h3>
              <p>Get suggestions based on your input</p>
            </motion.div>
          </div>

          {suggestionType === 'custom' && (
            <motion.div 
              className="custom-search-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="search-input-container">
                  <input
                    type="text"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="Enter a movie or TV show title..."
                    className="custom-search-input"
                  />
                  <button 
                    type="submit" 
                    className="search-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="btn-spinner"></div>
                    ) : (
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
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    )}
                  </button>
                </div>
              </form>

              {searchHistory.length > 0 && (
                <div className="search-history">
                  <p className="history-label">Recent searches:</p>
                  <div className="history-items">
                    {searchHistory.map((item, index) => (
                      <button 
                        key={index} 
                        className="history-item"
                        onClick={() => {
                          setCustomQuery(item);
                          getCustomSuggestion();
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div 
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="spinner"></div>
                <p>Finding the perfect suggestion for you...</p>
              </motion.div>
            )}

            {!isLoading && suggestionResult && (
              <motion.div 
                className="suggestion-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="result-header">
                  <h2>Your Suggestion</h2>
                  <span className="result-type">
                    {suggestionResult.type === 'movie' ? 'Movie' : 'TV Show'}
                  </span>
                </div>

                <div className="result-content">
                  <div className="poster-container">
                    <Image
                      src={suggestionResult.item.poster}
                      alt={suggestionResult.item.title}
                      width={300}
                      height={450}
                      className="suggestion-poster"
                    />
                  </div>

                  <div className="suggestion-details">
                    <h3 className="suggestion-title">{suggestionResult.item.title}</h3>
                    <p className="suggestion-meta">
                      {suggestionResult.item.year} • Directed by {suggestionResult.item.director}
                    </p>
                    
                    <div className="suggestion-genres">
                      {suggestionResult.item.genres.map((genre, index) => (
                        <span key={index} className="genre-tag">{genre}</span>
                      ))}
                    </div>
                    
                    <p className="suggestion-overview">{suggestionResult.item.overview}</p>
                    
                    <div className="action-buttons">
                      <button className="action-btn watch-btn">
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span>Mark as Watched</span>
                      </button>
                      
                      <button className="action-btn list-btn">
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
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Add to Watchlist</span>
                      </button>
                    </div>
                  </div>
                </div>

                {suggestionResult.similarItems && suggestionResult.similarItems.length > 0 && (
                  <div className="similar-items-section">
                    <h3 className="similar-title">You might also like:</h3>
                    <div className="similar-grid">
                      {suggestionResult.similarItems.map((item) => (
                        <motion.div 
                          key={item.id} 
                          className="similar-item"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="similar-poster-container">
                            <Image
                              src={item.poster}
                              alt={item.title}
                              width={160}
                              height={240}
                              className="similar-poster"
                            />
                          </div>
                          <h4 className="similar-item-title">{item.title}</h4>
                          <p className="similar-item-year">{item.year}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="get-another">
                  <button 
                    className="refresh-btn"
                    onClick={() => {
                      if (suggestionType === 'random-movie') getRandomMovie();
                      else if (suggestionType === 'random-tv') getRandomTVShow();
                      else getCustomSuggestion();
                    }}
                  >
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
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    </svg>
                    <span>Get Another Suggestion</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx>{`
        .suggest-container {
          background: rgba(26, 13, 44, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(126, 34, 206, 0.2);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .option-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .option-card {
          background: rgba(76, 29, 149, 0.2);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .option-card:hover {
          background: rgba(76, 29, 149, 0.3);
          border-color: rgba(126, 34, 206, 0.5);
        }
        
        .option-card.selected {
          background: rgba(126, 34, 206, 0.3);
          border-color: rgba(126, 34, 206, 0.8);
          box-shadow: 0 5px 15px rgba(126, 34, 206, 0.2);
        }
        
        .option-icon {
          font-size: 36px;
          margin-bottom: 16px;
        }
        
        .option-card h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .option-card p {
          color: #d8b4fe;
          font-size: 14px;
        }
        
        .custom-search-section {
          margin-bottom: 30px;
        }
        
        .search-input-container {
          position: relative;
          margin-bottom: 16px;
        }
        
        .custom-search-input {
          width: 100%;
          padding: 16px;
          padding-right: 50px;
          background: rgba(15, 5, 23, 0.5);
          border: 2px solid rgba(126, 34, 206, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 16px;
        }
        
        .custom-search-input:focus {
          border-color: rgba(126, 34, 206, 0.8);
          outline: none;
          box-shadow: 0 0 0 3px rgba(126, 34, 206, 0.2);
        }
        
        .search-button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(126, 34, 206, 0.5);
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .search-button:hover {
          background: rgba(126, 34, 206, 0.8);
        }
        
        .search-history {
          margin-top: 16px;
        }
        
        .history-label {
          font-size: 14px;
          color: #d8b4fe;
          margin-bottom: 8px;
        }
        
        .history-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .history-item {
          background: rgba(76, 29, 149, 0.2);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 12px;
          color: #d8b4fe;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .history-item:hover {
          background: rgba(126, 34, 206, 0.3);
          color: white;
        }
        
        .error-message {
          background: rgba(220, 38, 38, 0.2);
          border: 1px solid rgba(220, 38, 38, 0.3);
          color: #fca5a5;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
        }
        
        .spinner {
          border: 4px solid rgba(126, 34, 206, 0.3);
          border-top: 4px solid rgba(168, 85, 247, 0.8);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        .btn-spinner {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-container p {
          color: #d8b4fe;
        }
        
        .suggestion-result {
          background: rgba(76, 29, 149, 0.1);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(126, 34, 206, 0.3);
        }
        
        .result-header {
          background: rgba(76, 29, 149, 0.3);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .result-header h2 {
          font-size: 20px;
          font-weight: 600;
        }
        
        .result-type {
          background: rgba(126, 34, 206, 0.3);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .result-content {
          padding: 24px;
          display: grid;
          grid-template-columns: minmax(250px, 1fr) 2fr;
          gap: 24px;
        }
        
        @media (max-width: 768px) {
          .result-content {
            grid-template-columns: 1fr;
          }
        }
        
        .poster-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        
        .suggestion-poster {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .suggestion-details {
          display: flex;
          flex-direction: column;
        }
        
        .suggestion-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          background: linear-gradient(to right, #fff, #d8b4fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .suggestion-meta {
          font-size: 16px;
          color: #d8b4fe;
          margin-bottom: 16px;
        }
        
        .suggestion-genres {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .genre-tag {
          background: rgba(76, 29, 149, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 14px;
          color: #d8b4fe;
        }
        
        .suggestion-overview {
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .watch-btn {
          background: rgba(126, 34, 206, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.5);
          color: white;
        }
        
        .watch-btn:hover {
          background: rgba(126, 34, 206, 0.5);
          transform: translateY(-2px);
        }
        
        .list-btn {
          background: rgba(76, 29, 149, 0.2);
          border: 1px solid rgba(126, 34, 206, 0.3);
          color: #d8b4fe;
        }
        
        .list-btn:hover {
          background: rgba(76, 29, 149, 0.4);
          color: white;
          transform: translateY(-2px);
        }
        
        .similar-items-section {
          padding: 24px;
          border-top: 1px solid rgba(126, 34, 206, 0.2);
        }
        
        .similar-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #d8b4fe;
        }
        
        .similar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 20px;
        }
        
        .similar-item {
          cursor: pointer;
        }
        
        .similar-poster-container {
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        
        .similar-poster {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }
        
        .similar-item:hover .similar-poster {
          transform: scale(1.05);
        }
        
        .similar-item-title {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .similar-item-year {
          font-size: 12px;
          color: #d8b4fe;
        }
        
        .get-another {
          padding: 24px;
          text-align: center;
          border-top: 1px solid rgba(126, 34, 206, 0.2);
        }
        
        .refresh-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(45deg, #4c1d95, #7e22ce);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .refresh-btn:hover {
          background: linear-gradient(45deg, #5b21b6, #8b5cf6);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(126, 34, 206, 0.4);
        }
      `}</style>
    </main>
  );
}