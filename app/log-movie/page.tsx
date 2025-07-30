"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../components/Navigation";
import MovieSearch from "./components/MovieSearch";
import LogMovieForm from "./components/LogMovieForm";

// Define Movie interface
interface Movie {
  id: string;
  title: string;
  year: string;
  director: string;
  poster: string;
}

// Define LogData interface
interface LogData {
  movieId: string;
  rating: number;
  review: string;
  watchDate: string;
  location: string;
  companions: string;
  format: string;
  mood: string;
  isRewatch: boolean;
  isPrivate: boolean;
  isFavorite: boolean;
  timestamp: string;
}

// Sample movie data for search results - In a real app, fetch from API
const SAMPLE_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Dune: Part Two",
    year: "2024",
    director: "Denis Villeneuve",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  },
  {
    id: "2",
    title: "Oppenheimer",
    year: "2023",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
  },
  {
    id: "3",
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    director: "Joaquim Dos Santos",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  },
  {
    id: "4",
    title: "Poor Things",
    year: "2023",
    director: "Yorgos Lanthimos",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
  },
];

export default function LogMoviePage() {
  const router = useRouter();
  const [step, setStep] = useState<"search" | "details">("search");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [recentLogs, setRecentLogs] = useState<Movie[]>([]);

  useEffect(() => {
    // Simulate fetching recent logs
    setRecentLogs(SAMPLE_MOVIES.slice(0, 3));
  }, []);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitLog = (logData: LogData) => {
    console.log("Logging movie:", { ...logData, movie: selectedMovie });
    // In a real app, save to database
    
    // Show success notification and redirect
    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0517] via-[#120823] to-[#0a0417] text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="log-movie-container"
        >
          {step === "search" ? (
            <>
              <div className="text-center mb-12">
                <motion.h1 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Log a Movie
                </motion.h1>
                <motion.p
                  className="text-lg text-purple-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Track what you watch, when you watched it, and share your thoughts
                </motion.p>
              </div>

              <MovieSearch 
                onSelectMovie={handleSelectMovie} 
                sampleMovies={SAMPLE_MOVIES}
                recentLogs={recentLogs}
              />
            </>
          ) : (
            selectedMovie && (
              <LogMovieForm 
                movie={selectedMovie}
                onBack={() => setStep("search")}
                onSubmit={handleSubmitLog}
              />
            )
          )}
        </motion.div>
      </div>

      <style jsx global>{`
        .log-movie-container {
          background: rgba(26, 13, 44, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(126, 34, 206, 0.2);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </main>
  );
}