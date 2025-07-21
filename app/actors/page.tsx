"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

// Sample actors data - you'll replace this with your API call
const POPULAR_ACTORS = [
  { 
    id: "1", 
    name: "Tom Hanks", 
    image: "https://image.tmdb.org/t/p/w500/xndWFsBlClOJFRdhziIbAJe1Pn1.jpg",
    known_for: "Forrest Gump, Saving Private Ryan, Cast Away",
    birth: "July 9, 1956",
    nationality: "American"
  },
  { 
    id: "2", 
    name: "Meryl Streep", 
    image: "https://image.tmdb.org/t/p/w500/4wzOk8Sp2xoV9RqLlJwgVGZgzYA.jpg",
    known_for: "The Devil Wears Prada, Sophie's Choice, Mamma Mia!",
    birth: "June 22, 1949",
    nationality: "American"
  },
  { 
    id: "3", 
    name: "Leonardo DiCaprio", 
    image: "https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    known_for: "Titanic, The Revenant, Inception",
    birth: "November 11, 1974",
    nationality: "American"
  },
  { 
    id: "4", 
    name: "Viola Davis", 
    image: "https://image.tmdb.org/t/p/w500/xDssw6vpYNRjsybvMPRE30e0dPN.jpg",
    known_for: "The Help, Fences, How to Get Away with Murder",
    birth: "August 11, 1965",
    nationality: "American"
  },
  { 
    id: "5", 
    name: "Denzel Washington", 
    image: "https://image.tmdb.org/t/p/w500/jj2Gcobpopokal0YstuCQW0ldJ4.jpg",
    known_for: "Training Day, Remember the Titans, The Equalizer",
    birth: "December 28, 1954",
    nationality: "American"
  },
  { 
    id: "6", 
    name: "Cate Blanchett", 
    image: "https://image.tmdb.org/t/p/w500/rGdMG7yQl447PdkdYc8GiQZlr3T.jpg",
    known_for: "Blue Jasmine, Carol, The Lord of the Rings",
    birth: "May 14, 1969",
    nationality: "Australian"
  },
];

export default function ActorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("popularity");
  
  const filteredActors = POPULAR_ACTORS.filter(actor => 
    actor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0517] via-[#120823] to-[#0a0417] text-white">
      {/* Header with hero image */}
      <div className="relative w-full h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120823]/70 to-[#0f0517] z-10"></div>
        <div className="absolute inset-0 bg-[url('https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg')] bg-cover bg-center opacity-40"></div>
        
        <div className="container mx-auto px-8 relative z-20 h-full flex flex-col justify-end pb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Actors
          </motion.h1>
          <motion.p 
            className="text-lg text-purple-200 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover talented actors and their filmographies from around the world
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-8 py-12">
        {/* Search and filters */}
        <motion.div 
          className="mb-12 flex flex-col md:flex-row gap-6 md:items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="search-container relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a0d2c] px-5 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="filters flex gap-4">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-[#1a0d2c] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="birth_year">Birth Year</option>
            </select>
            
            <select
              className="bg-[#1a0d2c] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option value="all">All Nationalities</option>
              <option value="american">American</option>
              <option value="british">British</option>
              <option value="australian">Australian</option>
              <option value="other">Other</option>
            </select>
          </div>
        </motion.div>

        {/* Actors grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredActors.map((actor) => (
            <motion.div 
              key={actor.id} 
              className="actor-card"
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Link href={`/actors/${actor.id}`}>
                <div className="actor-image-container">
                  <Image
                    src={actor.image}
                    alt={actor.name}
                    width={300}
                    height={450}
                    className="actor-image"
                  />
                  <div className="actor-overlay">
                    <p className="text-sm text-purple-300">{actor.known_for}</p>
                  </div>
                </div>
                <h3 className="actor-name">{actor.name}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .actor-card {
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
          background-color: #1a0d2c;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .actor-image-container {
          position: relative;
          overflow: hidden;
          aspect-ratio: 2/3;
        }

        .actor-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .actor-card:hover .actor-image {
          transform: scale(1.05);
        }

        .actor-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(26, 13, 44, 0.9), transparent);
          padding: 40px 16px 16px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          opacity: 0;
        }

        .actor-card:hover .actor-overlay {
          transform: translateY(0);
          opacity: 1;
        }

        .actor-name {
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 600;
          color: white;
        }
      `}</style>
    </main>
  );
}