"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation"; // Corrected path

// Define types
interface Movie {
  id: string;
  title: string;
  year: string;
  director: string;
  poster: string;
  rating: number; // User's rating
  likedAt: string; // Date when user liked the movie
}

// Sample liked movies data with updated posters
const SAMPLE_LIKES: Movie[] = [
  {
    id: "1",
    title: "The Shawshank Redemption",
    year: "1994",
    director: "Frank Darabont",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 4,
    likedAt: "2023-12-15T09:24:00Z"
  },
  {
    id: "2",
    title: "The Godfather",
    year: "1972",
    director: "Francis Ford Coppola",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    rating: 5,
    likedAt: "2023-11-20T14:32:00Z"
  },
  {
    id: "3",
    title: "The Dark Knight",
    year: "2008",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 4,
    likedAt: "2024-01-05T18:45:00Z"
  },
  {
    id: "4",
    title: "Pulp Fiction",
    year: "1994",
    director: "Quentin Tarantino",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    rating: 5,
    likedAt: "2023-12-30T19:54:00Z"
  },
  {
    id: "5",
    title: "Inception",
    year: "2010",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    rating: 4,
    likedAt: "2024-02-22T14:28:00Z"
  },
  {
    id: "6",
    title: "The Matrix",
    year: "1999",
    director: "Lana and Lilly Wachowski",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    rating: 4,
    likedAt: "2023-11-12T21:37:00Z"
  },
  {
    id: "7",
    title: "Parasite",
    year: "2019",
    director: "Bong Joon-ho",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 5,
    likedAt: "2023-08-15T12:37:00Z"
  },
  {
    id: "8",
    title: "Everything Everywhere All at Once",
    year: "2022",
    director: "Daniel Kwan, Daniel Scheinert",
    poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    rating: 5,
    likedAt: "2024-01-18T08:42:00Z"
  },
  {
    id: "9",
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    director: "Joaquim Dos Santos",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    rating: 4,
    likedAt: "2023-07-05T17:22:00Z"
  },
  {
    id: "10",
    title: "The Godfather Part II",
    year: "1974",
    director: "Francis Ford Coppola",
    poster: "https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
    rating: 5,
    likedAt: "2024-02-10T20:12:00Z"
  },
  {
    id: "11",
    title: "Oppenheimer",
    year: "2023",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 4,
    likedAt: "2023-11-12T21:37:00Z"
  },
  {
    id: "12",
    title: "Interstellar",
    year: "2014",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 5,
    likedAt: "2023-10-05T17:22:00Z"
  },
  {
    id: "13",
    title: "The Silence of the Lambs",
    year: "1991",
    director: "Jonathan Demme",
    poster: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8vWBr1I.jpg",
    rating: 4,
    likedAt: "2023-09-05T17:22:00Z"
  },
  {
    id: "14",
    title: "Whiplash",
    year: "2014",
    director: "Damien Chazelle",
    poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    rating: 5,
    likedAt: "2023-08-05T17:22:00Z"
  },
  {
    id: "15",
    title: "Dune: Part Two",
    year: "2024",
    director: "Denis Villeneuve",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    rating: 4,
    likedAt: "2024-03-05T17:22:00Z"
  },
  {
    id: "16",
    title: "Poor Things",
    year: "2023",
    director: "Yorgos Lanthimos",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    rating: 4,
    likedAt: "2024-02-05T17:22:00Z"
  }
];

// Sort options
type SortOption = "date" | "rating" | "title" | "year";

export default function MyLikesPage() {
  const [activeTab, setActiveTab] = useState<string>("films");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedDecade, setSelectedDecade] = useState<string>("");
  const [likes, setLikes] = useState<Movie[]>([]);

  useEffect(() => {
    // In a real app, fetch likes from an API
    setLikes(SAMPLE_LIKES);
  }, []);

  // Sort likes based on selected sort option
  useEffect(() => {
    const sortedLikes = [...likes];
    
    if (sortBy === "date") {
      sortedLikes.sort((a, b) => new Date(b.likedAt).getTime() - new Date(a.likedAt).getTime());
    } else if (sortBy === "rating") {
      sortedLikes.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      sortedLikes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "year") {
      sortedLikes.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }
    
    setLikes(sortedLikes);
  }, [sortBy]);

  // Apply filters
  const filteredLikes = likes.filter(movie => {
    if (selectedDecade && !movie.year.startsWith(selectedDecade.slice(0, 3))) {
      return false;
    }
    return true;
  });

  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>★</span>
      );
    }
    return stars;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0517] via-[#120823] to-[#0a0417] text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="likes-container">
          <motion.h1 
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Likes
          </motion.h1>

          {/* Navigation tabs */}
          <div className="tabs-container mb-8">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'films' ? 'active' : ''}`}
                onClick={() => setActiveTab('films')}
              >
                Films
              </button>
              <button 
                className={`tab ${activeTab === 'actors' ? 'active' : ''}`}
                onClick={() => setActiveTab('actors')}
              >
                Actors
              </button>
              <button 
                className={`tab ${activeTab === 'directors' ? 'active' : ''}`}
                onClick={() => setActiveTab('directors')}
              >
                Directors
              </button>
              <button 
                className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
              <button 
                className={`tab ${activeTab === 'lists' ? 'active' : ''}`}
                onClick={() => setActiveTab('lists')}
              >
                Lists
              </button>
            </div>
          </div>

          {/* Filter options */}
          <div className="filters-container mb-8">
            <div className="filter-group">
              <div className="dropdown">
                <button className="dropdown-btn">
                  Sort by: {sortBy === 'date' ? 'Date Liked' : sortBy === 'rating' ? 'Rating' : sortBy === 'title' ? 'Title' : 'Year'}
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
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <div className="dropdown-content">
                  <button onClick={() => setSortBy('date')}>Date Liked</button>
                  <button onClick={() => setSortBy('rating')}>Rating</button>
                  <button onClick={() => setSortBy('title')}>Title</button>
                  <button onClick={() => setSortBy('year')}>Year</button>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <div className="dropdown">
                <button className="dropdown-btn">
                  Genre: {selectedGenre || 'All'}
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
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <div className="dropdown-content">
                  <button onClick={() => setSelectedGenre("")}>All</button>
                  <button onClick={() => setSelectedGenre("Action")}>Action</button>
                  <button onClick={() => setSelectedGenre("Drama")}>Drama</button>
                  <button onClick={() => setSelectedGenre("Comedy")}>Comedy</button>
                  <button onClick={() => setSelectedGenre("Sci-Fi")}>Sci-Fi</button>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <div className="dropdown">
                <button className="dropdown-btn">
                  Decade: {selectedDecade || 'All'}
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
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <div className="dropdown-content">
                  <button onClick={() => setSelectedDecade("")}>All</button>
                  <button onClick={() => setSelectedDecade("2020s")}>2020s</button>
                  <button onClick={() => setSelectedDecade("2010s")}>2010s</button>
                  <button onClick={() => setSelectedDecade("2000s")}>2000s</button>
                  <button onClick={() => setSelectedDecade("1990s")}>1990s</button>
                  <button onClick={() => setSelectedDecade("1980s")}>1980s</button>
                  <button onClick={() => setSelectedDecade("1970s")}>1970s</button>
                  <button onClick={() => setSelectedDecade("1960s")}>1960s</button>
                  <button onClick={() => setSelectedDecade("1950s")}>1950s</button>
                </div>
              </div>
            </div>
          </div>

          {/* Likes grid */}
          <div className="likes-grid">
            {filteredLikes.map((movie) => (
              <motion.div 
                key={movie.id} 
                className="movie-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="poster-container">
                  <Link href={`/movies/${movie.id}`}>
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      width={220}
                      height={330}
                      unoptimized  // Necessary for external images
                      sizes="(max-width: 768px) 140px, 160px"
                      className="movie-poster"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        transition: 'transform 0.3s ease'
                      }}
                      onError={(e) => {
                        // Fallback to a placeholder if the image fails to load
                        e.currentTarget.src = "https://via.placeholder.com/220x330?text=No+Image";
                      }}
                    />
                  </Link>

                  <button className="like-button liked">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="rating-stars">
                  {renderStars(movie.rating)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .likes-container {
          background: rgba(26, 13, 44, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(126, 34, 206, 0.2);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .tabs-container {
          border-bottom: 1px solid rgba(126, 34, 206, 0.3);
        }
        
        .tabs {
          display: flex;
          gap: 8px;
        }
        
        .tab {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 500;
          color: #d8b4fe;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .tab:hover {
          color: white;
        }
        
        .tab.active {
          color: white;
          border-bottom: 2px solid #7e22ce;
        }
        
        .filters-container {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .dropdown {
          position: relative;
          display: inline-block;
        }
        
        .dropdown-btn {
          background: rgba(76, 29, 149, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 8px;
          padding: 8px 16px;
          color: #d8b4fe;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 160px;
        }
        
        .dropdown-btn:hover {
          background: rgba(76, 29, 149, 0.5);
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          background: rgba(26, 13, 44, 0.95);
          min-width: 160px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 8px;
          z-index: 10;
          overflow: hidden;
          margin-top: 4px;
        }
        
        .dropdown-content button {
          color: #d8b4fe;
          padding: 10px 16px;
          text-decoration: none;
          display: block;
          text-align: left;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .dropdown-content button:hover {
          background-color: rgba(126, 34, 206, 0.3);
          color: white;
        }
        
        .dropdown:hover .dropdown-content {
          display: block;
        }
        
        .likes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }
        
        .movie-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .poster-container {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          margin-bottom: 8px;
          aspect-ratio: 2/3;
          background-color: rgba(30, 15, 45, 0.4); /* Add a background color while images load */
        }
        
        .movie-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .movie-card:hover .poster-container img {
          transform: scale(1.05);
        }
        
        .like-button {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 5, 23, 0.7);
          border: none;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.2s ease;
        }
        
        .like-button.liked {
          color: #e11d48;
        }
        
        .rating-stars {
          display: flex;
          gap: 2px;
          justify-content: center;
          padding: 6px 0;
        }
        
        .star {
          font-size: 18px;
          line-height: 1;
        }
        
        .star.filled {
          color: #facc15;
        }
        
        .star.empty {
          color: rgba(250, 204, 21, 0.3);
        }
        
        @media (max-width: 768px) {
          .tabs {
            flex-wrap: wrap;
          }
          
          .tab {
            padding: 8px 16px;
            font-size: 14px;
          }
          
          .filters-container {
            flex-direction: column;
            gap: 8px;
          }
          
          .likes-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 16px;
          }
        }
      `}</style>
    </main>
  );
}