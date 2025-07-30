"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
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
        isProfileMenuOpen && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <>
      <nav className={`fixed w-full z-50 bg-gradient-to-b from-[#0f0517]/90 to-[#0f0517]/70 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-3xl font-bold text-white mr-8">
              <span className="text-purple-400">Cine</span>DB
            </Link>

            {/* Main navigation links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/movies" className="nav-link">Movies</Link>
              <Link href="/tv" className="nav-link">TV</Link>
              <Link href="/anime" className="nav-link">Anime</Link>
              <Link href="/actors" className="nav-link">Actors</Link>
              <Link href="/genres" className="nav-link">Genres</Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-[#1f1235]/60 border border-purple-900/30 rounded-full px-4 py-2 pl-10 w-56 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <svg 
                  className="absolute left-3 top-2.5 text-purple-300" 
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>

              {/* Suggest Me Button */}
              <Link href="/suggest" className="suggest-button hidden md:flex">
                Suggest Me
              </Link>

              {/* Log Button - Update to open modal */}
              <Link href="/log-movie" className="log-button hidden md:flex">
                Log
              </Link>

              {/* Profile Menu */}
              <div className="relative z-50">
                <button 
                  className="profile-avatar-small"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  ref={buttonRef}
                  aria-label="User profile"
                >
                  <Image
                    src="https://image.tmdb.org/t/p/w500/6TE2AlOUqcrs7CyJiWYgmzlzMNS.jpg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <motion.div 
                    className="profile-dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    ref={dropdownRef}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '45px',
                      width: '240px',
                      backgroundColor: '#1a0d2c',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(126, 34, 206, 0.3)',
                      zIndex: 999,
                      padding: '8px 0' // Add overall padding to the container
                    }}
                  >
                    <div className="profile-header" style={{ padding: '16px 20px' }}> {/* Increase horizontal padding */}
                      <div className="user-info">
                        <p className="user-name">Guest User</p>
                        <p className="user-email">guest@example.com</p>
                      </div>
                    </div>
                    <div className="menu-items" style={{ padding: '8px 0' }}>
                      <Link href="/profile" className="menu-item" style={{ padding: '10px 20px' }}>My Profile</Link> {/* Increase horizontal padding */}
                      <Link href="/watchlist" className="menu-item" style={{ padding: '10px 20px' }}>My Watchlist</Link>
                      <Link href="/profile/likes" className="menu-item" style={{ padding: '10px 20px' }}>My Likes</Link>
                      <Link href="/lists" className="menu-item" style={{ padding: '10px 20px' }}>My Lists</Link>
                      <Link href="/diary" className="menu-item" style={{ padding: '10px 20px' }}>My Diary</Link>
                      <Link href="/settings" className="menu-item" style={{ padding: '10px 20px' }}>Settings</Link>
                      <div className="menu-divider" style={{ margin: '8px 12px' }}></div> {/* Add horizontal margin */}
                      <button className="menu-item logout-item" style={{ padding: '10px 20px' }}>Log Out</button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Mobile menu button - only shown on small screens */}
              <button className="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .nav-link {
            color: white;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .nav-link:hover {
            color: #a78bfa;
          }
          
          .suggest-button, .log-button {
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
          
          .suggest-button:hover, .log-button:hover {
            background-color: rgba(107, 33, 168, 0.4);
            transform: translateY(-2px);
          }
          
          .log-button {
            background-color: rgba(124, 58, 237, 0.25);
          }
          
          .profile-dropdown {
            position: absolute;
            right: 0;
            top: 100%; /* Change to 100% */
            transform: translateY(10px); /* Add spacing */
            margin-top: 0;
            width: 240px;
            background-color: #1a0d2c;
            border: 1px solid rgba(126, 34, 206, 0.3);
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            overflow: hidden;
            z-index: 100; /* Increase z-index */
          }
          
          .profile-header {
            padding: 16px;
            border-bottom: 1px solid rgba(126, 34, 206, 0.2);
          }
          
          .user-name {
            font-weight: 600;
            font-size: 15px;
            color: white;
            margin-bottom: 2px;
          }
          
          .user-email {
            font-size: 13px;
            color: rgba(176, 132, 252, 0.8);
          }
          
          .menu-items {
            padding: 8px 0;
          }
          
          .menu-item {
            display: block;
            padding: 10px 16px;
            font-size: 14px;
            color: white;
            transition: all 0.2s ease;
            text-align: left;
            width: 100%;
          }
          
          .menu-item:hover {
            background-color: rgba(126, 34, 206, 0.2);
          }
          
          .menu-divider {
            height: 1px;
            background-color: rgba(126, 34, 206, 0.2);
            margin: 8px 0;
          }
          
          .logout-item {
            color: #f87171;
          }
          
          .logout-item:hover {
            background-color: rgba(248, 113, 113, 0.1);
          }
        `}</style>
      </nav>
      
      {/* Log Movie Modal */}
      {/* <LogMovieModal 
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      /> */}
    </>
  );
}