"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// Sample actor data
const ACTOR_DATA = {
  id: "1",
  name: "Tom Hanks",
  image: "https://image.tmdb.org/t/p/w500/xndWFsBlClOJFRdhziIbAJe1Pn1.jpg",
  biography: "An American actor and filmmaker, known for both his comedic and dramatic roles. Hanks is one of the most popular and recognizable film stars worldwide, and is regarded as an American cultural icon. His films have grossed more than $4.9 billion in North America and more than $9.96 billion worldwide, making him the fourth-highest-grossing actor in North America.",
  birth: "July 9, 1956",
  place_of_birth: "Concord, California, USA",
  nationality: "American",
  height: "6' 0\" (1.83 m)",
  known_for_department: "Acting",
  views: 3,
  total_films: 89
};

// Sample filmography data
const FILMOGRAPHY = [
  {
    id: "1",
    title: "Forrest Gump",
    year: "1994",
    role: "Forrest Gump",
    poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    director: "Robert Zemeckis"
  },
  {
    id: "2",
    title: "Saving Private Ryan",
    year: "1998",
    role: "Captain Miller",
    poster: "https://image.tmdb.org/t/p/w500/1wY4psJ5NVEhCuOYROwLH2XExM2.jpg",
    director: "Steven Spielberg"
  },
  {
    id: "3",
    title: "Cast Away",
    year: "2000",
    role: "Chuck Noland",
    poster: "https://image.tmdb.org/t/p/w500/6bzgEkzeGpP2XzcaHnMPaSjJeF9.jpg",
    director: "Robert Zemeckis"
  },
  {
    id: "4",
    title: "Toy Story",
    year: "1995",
    role: "Woody (voice)",
    poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    director: "John Lasseter"
  },
  {
    id: "5",
    title: "The Green Mile",
    year: "1999",
    role: "Paul Edgecomb",
    poster: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
    director: "Frank Darabont"
  },
  {
    id: "6",
    title: "That Thing You Do!",
    year: "1996",
    role: "Mr. White",
    poster: "https://image.tmdb.org/t/p/w500/4vQYLnT3fOE8CKCjXEBxGFLVCM2.jpg",
    director: "Tom Hanks"
  },
  {
    id: "7",
    title: "Sully",
    year: "2016",
    role: "Chesley 'Sully' Sullenberger",
    poster: "https://image.tmdb.org/t/p/w500/1SupHAwzZsScRaGyfxx1hoOQZkK.jpg",
    director: "Clint Eastwood"
  }
];

// Reusable movie action buttons component
const MovieActionButtons = () => (
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
);

export default function ActorDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("popular");
  const [liked, setLiked] = useState(false);
  
  // In a real application, you would fetch data based on the ID
  const actor = ACTOR_DATA;
  const actorId = params.id;
  
  // Calculate the percentage for the progress bar
  const watchedPercentage = Math.round((actor.views / actor.total_films) * 100);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0517] via-[#120823] to-[#0a0417] text-white">
      {/* Actor Hero Section */}
      <div className="container mx-auto px-4 md:px-8 pt-24 pb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Actor Image */}
          <motion.div 
            className="md:w-1/4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="actor-profile-image">
              <Image
                src={actor.image}
                alt={actor.name}
                width={300}
                height={450}
                className="rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          {/* Actor Info */}
          <motion.div 
            className="md:w-3/4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {actor.name}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-purple-200 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              An American actor and filmmaker, known for both his comedic and dramatic roles.
            </motion.p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="actor-info-item">
                <span className="actor-info-label">Born:</span> {actor.birth}
              </div>
              <div className="actor-info-item">
                <span className="actor-info-label">Nationality:</span> {actor.nationality}
              </div>
            </div>

            <div className="actor-actions flex gap-4 mb-8">
              <button 
                className={`action-button ${liked ? 'liked' : ''}`}
                onClick={() => setLiked(!liked)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>Like</span>
              </button>
              
              <button className="action-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Add to List</span>
              </button>
            </div>

            {/* Films progress section with smaller progress bar and no percentage */}
            <div className="actor-stats mb-3">
              <div className="text-sm mb-2">
                <span className="text-purple-300">You've seen <span className="text-white font-semibold">{actor.views}</span> of <span className="text-white font-semibold">{actor.total_films}</span> films</span>
              </div>
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${watchedPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Popular Works Section */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <motion.h2 
          className="text-2xl font-bold mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="show"
        >
          Popular Works
        </motion.h2>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {FILMOGRAPHY.slice(0, 5).map((film) => (
            <motion.div 
              key={film.id} 
              className="film-card"
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Link href={`/movie/${film.id}`}>
                <div className="film-poster-container">
                  <Image
                    src={film.poster}
                    alt={film.title}
                    width={200}
                    height={300}
                    className="film-poster"
                  />
                  <div className="film-overlay">
                    <p className="film-role">{film.role}</p>
                    <p className="film-director">Dir: {film.director}</p>
                  </div>
                  
                  {/* Added movie action buttons */}
                  <MovieActionButtons />
                </div>
                <h3 className="film-title">{film.title}</h3>
                <p className="film-year">{film.year}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Filmography Section */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <motion.h2 
            className="text-2xl font-bold"
            variants={fadeIn}
            initial="hidden"
            animate="show"
          >
            Filmography
          </motion.h2>
          
          <motion.div 
            className="flex bg-[#1a0d2c] rounded-lg p-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button 
              className={`tab-button ${activeTab === "popular" ? "active" : ""}`}
              onClick={() => setActiveTab("popular")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              <span>Actor</span>
            </button>
            <button 
              className={`tab-button ${activeTab === "director" ? "active" : ""}`}
              onClick={() => setActiveTab("director")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span>Director</span>
            </button>
            <button 
              className={`tab-button ${activeTab === "producer" ? "active" : ""}`}
              onClick={() => setActiveTab("producer")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1v22"></path>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span>Producer</span>
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="filmography-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {FILMOGRAPHY.map((film) => (
            <motion.div 
              key={film.id} 
              className="filmography-item"
              variants={item}
              whileHover={{ backgroundColor: 'rgba(76, 29, 149, 0.1)', transition: { duration: 0.2 } }}
            >
              <Link href={`/movie/${film.id}`} className="filmography-link">
                <div className="film-small-poster">
                  <Image
                    src={film.poster}
                    alt={film.title}
                    width={60}
                    height={90}
                    className="rounded"
                  />
                  
                  {/* Small action buttons for the filmography list */}
                  <div className="film-small-actions">
                    <button className="film-small-action-btn" title="Watched">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button className="film-small-action-btn" title="Add to Watchlist">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="film-details">
                  <h3 className="film-details-title">{film.title}</h3>
                  <p className="film-details-year">{film.year}</p>
                </div>
                <div className="film-role-tag">
                  {film.role}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .actor-profile-image {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .actor-info-item {
          display: inline-flex;
          align-items: center;
        }

        .actor-info-label {
          color: #a78bfa;
          margin-right: 6px;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
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

        .action-button.liked {
          background-color: rgba(236, 72, 153, 0.3);
          border-color: rgba(236, 72, 153, 0.5);
          color: rgba(249, 168, 212, 1);
        }

        /* Progress bar styles */
        .progress-bar-bg {
          width: 100%;
          height: 4px; /* Smaller height */
          background-color: rgba(76, 29, 149, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #4c1d95, #7e22ce, #a78bfa);
          border-radius: 2px;
        }

        .film-card {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          background-color: #1a0d2c;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .film-poster-container {
          position: relative;
          overflow: hidden;
          aspect-ratio: 2/3;
        }

        .film-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .film-card:hover .film-poster {
          transform: scale(1.05);
        }

        .film-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(26, 13, 44, 0.9), transparent);
          padding: 40px 12px 12px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          opacity: 0;
        }

        .film-card:hover .film-overlay {
          transform: translateY(0);
          opacity: 1;
        }

        /* Movie action buttons styles - same as in HomeScreen */
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

        .film-card:hover .movie-actions {
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

        .film-role {
          font-size: 13px;
          color: #a78bfa;
          margin-bottom: 4px;
        }

        .film-director {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .film-title {
          padding: 12px 12px 4px;
          font-size: 15px;
          font-weight: 600;
          color: white;
        }

        .film-year {
          padding: 0 12px 12px;
          font-size: 13px;
          color: #a78bfa;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 6px;
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.2s ease;
        }

        .tab-button:hover {
          color: white;
        }

        .tab-button.active {
          background-color: rgba(126, 34, 206, 0.4);
          color: white;
        }

        .filmography-grid {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .filmography-item {
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .filmography-link {
          display: flex;
          align-items: center;
          padding: 12px;
          gap: 16px;
        }

        .film-small-poster {
          position: relative;
        }

        /* Small action buttons for filmography list */
        .film-small-actions {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .filmography-item:hover .film-small-actions {
          opacity: 1;
        }

        .film-small-action-btn {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: rgba(15, 5, 23, 0.8);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          border: 1px solid rgba(126, 34, 206, 0.3);
        }

        .film-small-action-btn:hover {
          background-color: rgba(126, 34, 206, 0.8);
          transform: scale(1.1);
        }

        .film-details {
          flex: 1;
        }

        .film-details-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .film-details-year {
          font-size: 14px;
          color: #a78bfa;
        }

        .film-role-tag {
          padding: 6px 12px;
          background-color: rgba(76, 29, 149, 0.3);
          border-radius: 6px;
          font-size: 14px;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .film-role-tag {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}