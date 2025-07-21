"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside of the profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isProfileOpen && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0f0517]/70 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-3xl font-bold tracking-wider bg-gradient-to-r from-purple-300 to-violet-400 bg-clip-text text-transparent">
            CineDB
          </Link>
        </motion.div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/movies" className="nav-link flex items-center gap-2 text-white hover:text-purple-300 transition-colors">
              <div className="nav-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>
              </div>
              <span>Movies</span>
            </Link>
            <Link href="/actors" className="nav-link flex items-center gap-2 text-white hover:text-purple-300 transition-colors">
              <div className="nav-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span>Actors</span>
            </Link>
            <Link href="/genres" className="nav-link flex items-center gap-2 text-white hover:text-purple-300 transition-colors">
              <div className="nav-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                </svg>
              </div>
              <span>Genres</span>
            </Link>
            <Link href="/suggest" className="suggest-button">
              Suggest Me
            </Link>
          </nav>

          <div className="relative">
            <button 
              className="profile-avatar-small"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              ref={buttonRef}
              aria-label="User profile"
            >
              <Image 
                src="/images/avatar-placeholder.png" 
                alt="User profile" 
                width={40} 
                height={40}
                className="rounded-full"
              />
            </button>

            {isProfileOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-[#190a2c] rounded-lg shadow-xl py-2 z-50"
                ref={dropdownRef}
              >
                <div className="px-4 py-2 border-b border-purple-900">
                  <p className="text-sm text-white font-medium">Guest User</p>
                  <p className="text-xs text-purple-300">guest@example.com</p>
                </div>
                <Link href="/profile" className="block px-4 py-2 text-sm text-white hover:bg-purple-900">
                  Your Profile
                </Link>
                <Link href="/watchlist" className="block px-4 py-2 text-sm text-white hover:bg-purple-900">
                  Watchlist
                </Link>
                <Link href="/ratings" className="block px-4 py-2 text-sm text-white hover:bg-purple-900">
                  Your Ratings
                </Link>
                <Link href="/likes" className="block px-4 py-2 text-sm text-white hover:bg-purple-900">
                  Liked Movies
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-sm text-white hover:bg-purple-900">
                  Settings
                </Link>
                <div className="border-t border-purple-900 mt-2 pt-2">
                  <button className="block w-full text-left px-4 py-2 text-sm text-pink-500 hover:bg-purple-900">
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}