"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Define types
interface Movie {
  id: string;
  title: string;
  year: string;
  director: string;
  poster: string;
}

interface MovieSearchProps {
  onSelectMovie: (movie: Movie) => void;
  sampleMovies: Movie[];
  recentLogs: Movie[];
}

export default function MovieSearch({ onSelectMovie, sampleMovies, recentLogs }: MovieSearchProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true);
      // Simulate API call with delay
      const timeoutId = setTimeout(() => {
        const filtered = sampleMovies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, sampleMovies]);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search for a movie to log..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-icon">
            {isLoading ? (
              <div className="loading-spinner"></div>
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
          </div>
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={() => setSearchQuery("")}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h2 className="results-title">Found {searchResults.length} results</h2>
          <div className="results-grid">
            {searchResults.map((movie) => (
              <motion.div
                key={movie.id}
                className="movie-card"
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectMovie(movie)}
              >
                <div className="poster-container">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="movie-poster"
                  />
                  <div className="movie-overlay">
                    <button className="log-now-button">
                      Log Now
                    </button>
                  </div>
                </div>
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-info">{movie.year} • {movie.director}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {searchQuery.length > 2 && searchResults.length === 0 && !isLoading && (
        <div className="no-results">
          <p>No movies found matching "{searchQuery}"</p>
          <p className="no-results-suggestion">
            Try a different search term or <button className="text-purple-400 underline">request to add this movie</button>
          </p>
        </div>
      )}

      {searchQuery.length <= 2 && (
        <div className="recent-section">
          <h2 className="section-title">Recent Watches by Friends</h2>
          <div className="recent-grid">
            {recentLogs.map((movie) => (
              <motion.div
                key={movie.id}
                className="recent-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectMovie(movie)}
              >
                <div className="recent-poster-container">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={160}
                    height={240}
                    className="recent-poster"
                  />
                  <div className="friend-activity">
                    <div className="friend-avatar">
                      <Image 
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Friend"
                        width={24}
                        height={24}
                        className="avatar-img"
                      />
                    </div>
                    <div className="rating-badge">★ 4.5</div>
                  </div>
                </div>
                <h3 className="recent-title">{movie.title}</h3>
                <p className="recent-meta">Watched 2 days ago</p>
              </motion.div>
            ))}
          </div>

          <div className="popular-section">
            <h2 className="section-title">Popular Movies to Log</h2>
            <div className="trending-tags">
              <button className="trending-tag">Trending Now</button>
              <button className="trending-tag">In Theaters</button>
              <button className="trending-tag">Award Winners</button>
              <button className="trending-tag">2024 Releases</button>
              <button className="trending-tag">Classic Films</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .search-input-wrapper {
          margin-bottom: 2rem;
        }
        
        .search-input {
          width: 100%;
          padding: 1rem 3rem 1rem 1.5rem;
          background: rgba(15, 5, 23, 0.5);
          border: 2px solid rgba(126, 34, 206, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          border-color: rgba(126, 34, 206, 0.8);
          box-shadow: 0 0 0 3px rgba(126, 34, 206, 0.2);
          outline: none;
        }
        
        .search-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a78bfa;
        }
        
        .clear-search {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a78bfa;
          font-size: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(126, 34, 206, 0.3);
          border-top-color: #a78bfa;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: white;
        }
        
        .results-title {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: #d8b4fe;
        }
        
        .results-grid, .recent-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .movie-card, .recent-card {
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .poster-container, .recent-poster-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 0.75rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          aspect-ratio: 2/3;
        }
        
        .movie-poster, .recent-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .movie-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 5, 23, 0.9), transparent);
          opacity: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 1.5rem;
          transition: opacity 0.3s ease;
        }
        
        .movie-card:hover .movie-overlay {
          opacity: 1;
        }
        
        .movie-card:hover .movie-poster {
          transform: scale(1.05);
        }
        
        .log-now-button {
          background: linear-gradient(45deg, #4c1d95, #7e22ce);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .log-now-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 10px rgba(126, 34, 206, 0.4);
        }
        
        .movie-title, .recent-title {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .movie-info, .recent-meta {
          font-size: 0.8rem;
          color: #d8b4fe;
        }
        
        .friend-activity {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          background: linear-gradient(to bottom, rgba(15, 5, 23, 0.7), transparent);
        }
        
        .friend-avatar {
          width: 24px;
          height: 24px;
          border: 2px solid #7e22ce;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .rating-badge {
          background: rgba(126, 34, 206, 0.8);
          color: white;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 3px 6px;
          border-radius: 4px;
        }
        
        .no-results {
          text-align: center;
          padding: 3rem 0;
          color: #d8b4fe;
        }
        
        .no-results-suggestion {
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }
        
        .trending-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .trending-tag {
          background: rgba(76, 29, 149, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 20px;
          padding: 0.5rem 1rem;
          color: #d8b4fe;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        
        .trending-tag:hover {
          background: rgba(126, 34, 206, 0.4);
          transform: translateY(-2px);
        }
        
        .popular-section {
          margin-top: 3rem;
        }
        
        .recent-section {
          animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}