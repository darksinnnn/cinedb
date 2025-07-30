"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Constants for form options
const WATCH_LOCATIONS = [
  "Theater",
  "Home",
  "Netflix",
  "Prime Video",
  "Disney+",
  "HBO Max",
  "Film Festival",
  "Airplane",
  "Drive-in",
  "Other",
];

const WATCH_FORMATS = [
  "Digital",
  "70mm",
  "IMAX",
  "35mm",
  "Dolby",
  "4DX",
  "RPX",
  "ScreenX",
];

const WATCH_MOODS = [
  "😍 Loved it",
  "🤔 Made me think",
  "😢 Made me cry", 
  "😂 Made me laugh",
  "😱 Scared me",
  "😴 Bored me",
  "🤯 Blew my mind",
  "😊 Nostalgic",
];

// Define types for the component props
interface Movie {
  id: string;
  title: string;
  year: string;
  director: string;
  poster: string;
}

interface LogMovieFormProps {
  movie: Movie;
  onBack: () => void;
  onSubmit: (logData: LogData) => void;
}

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

export default function LogMovieForm({ movie, onBack, onSubmit }: LogMovieFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [watchDate, setWatchDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [watchLocation, setWatchLocation] = useState<string>("");
  const [watchCompanions, setWatchCompanions] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [isRewatch, setIsRewatch] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Create log data object
    const logData: LogData = {
      movieId: movie.id,
      rating,
      review: reviewText,
      watchDate,
      location: watchLocation,
      companions: watchCompanions,
      format: selectedFormat,
      mood: selectedMood,
      isRewatch,
      isPrivate,
      isFavorite,
      timestamp: new Date().toISOString(),
    };
    
    // Simulate API call
    setTimeout(() => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        onSubmit(logData);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="log-form-container">
      <button 
        className="back-button" 
        onClick={onBack}
        disabled={isSubmitting}
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
        <span>Back to search</span>
      </button>

      {showSuccessMessage ? (
        <motion.div 
          className="success-message"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="success-icon">✓</div>
          <h2>Movie logged successfully!</h2>
          <p>Your diary has been updated.</p>
        </motion.div>
      ) : (
        <>
          <div className="movie-header">
            <div className="movie-poster-container">
              <Image 
                src={movie.poster} 
                alt={movie.title}
                width={200}
                height={300}
                className="movie-poster"
              />
            </div>
            <div className="movie-info">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-meta">{movie.year} • Directed by {movie.director}</p>
              
              <div className="movie-actions">
                <div className="toggle-container">
                  <input 
                    type="checkbox" 
                    id="rewatch" 
                    checked={isRewatch}
                    onChange={() => setIsRewatch(!isRewatch)}
                  />
                  <label htmlFor="rewatch">
                    <span className="toggle-icon">🔄</span>
                    Rewatch
                  </label>
                </div>
                
                <div className="toggle-container">
                  <input 
                    type="checkbox" 
                    id="favorite" 
                    checked={isFavorite}
                    onChange={() => setIsFavorite(!isFavorite)}
                  />
                  <label htmlFor="favorite">
                    <span className="toggle-icon">❤️</span>
                    Favorite
                  </label>
                </div>
                
                <div className="toggle-container">
                  <input 
                    type="checkbox" 
                    id="private" 
                    checked={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)}
                  />
                  <label htmlFor="private">
                    <span className="toggle-icon">🔒</span>
                    Private
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-section rating-section">
              <h2 className="section-title">Your Rating</h2>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`star-button ${rating >= star ? "active" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill={rating >= star ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </button>
                ))}
              </div>
              <p className="rating-text">
                {rating === 0
                  ? "Tap a star to rate"
                  : rating === 1
                  ? "I didn't like it"
                  : rating === 2
                  ? "It was okay"
                  : rating === 3
                  ? "I liked it"
                  : rating === 4
                  ? "I really liked it"
                  : "I loved it!"}
              </p>
            </div>

            <div className="form-section review-section">
              <h2 className="section-title">Your Review</h2>
              <textarea
                className="review-textarea"
                placeholder="Share your thoughts on the movie..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              <div className="char-counter">
                {reviewText.length}/500 characters
              </div>
            </div>

            <div className="form-section date-section">
              <h2 className="section-title">When did you watch?</h2>
              <input
                type="date"
                className="date-input"
                value={watchDate}
                onChange={(e) => setWatchDate(e.target.value)}
              />
            </div>

            <div className="form-section where-section">
              <h2 className="section-title">Where did you watch?</h2>
              <div className="options-grid">
                {WATCH_LOCATIONS.map((location) => (
                  <button
                    key={location}
                    className={`option-button ${watchLocation === location ? "selected" : ""}`}
                    onClick={() => setWatchLocation(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section companions-section">
              <h2 className="section-title">Who did you watch with?</h2>
              <input
                type="text"
                className="companions-input"
                placeholder="Alone, or enter names..."
                value={watchCompanions}
                onChange={(e) => setWatchCompanions(e.target.value)}
              />
            </div>

            <div className="form-section format-section">
              <h2 className="section-title">Format</h2>
              <div className="options-grid">
                {WATCH_FORMATS.map((format) => (
                  <button
                    key={format}
                    className={`option-button ${selectedFormat === format ? "selected" : ""}`}
                    onClick={() => setSelectedFormat(format)}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section mood-section">
              <h2 className="section-title">How did it make you feel?</h2>
              <div className="options-grid mood-grid">
                {WATCH_MOODS.map((mood) => (
                  <button
                    key={mood}
                    className={`option-button mood-button ${selectedMood === mood ? "selected" : ""}`}
                    onClick={() => setSelectedMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="submit-section">
            <button 
              className="cancel-button" 
              onClick={onBack}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              className="submit-button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>Logging...</span>
                </>
              ) : (
                "Log Movie"
              )}
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .log-form-container {
          position: relative;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #d8b4fe;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 2rem;
          transition: all 0.2s ease;
        }
        
        .back-button:hover {
          color: white;
          transform: translateX(-4px);
        }
        
        .movie-header {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        
        .movie-poster-container {
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        
        .movie-poster {
          display: block;
        }
        
        .movie-info {
          flex: 1;
        }
        
        .movie-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #fff, #d8b4fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .movie-meta {
          font-size: 1.1rem;
          color: #d8b4fe;
          margin-bottom: 2rem;
        }
        
        .movie-actions {
          display: flex;
          gap: 1.5rem;
        }
        
        .toggle-container {
          position: relative;
        }
        
        .toggle-container input {
          position: absolute;
          opacity: 0;
          height: 0;
          width: 0;
        }
        
        .toggle-container label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(76, 29, 149, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 20px;
          color: #d8b4fe;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .toggle-container input:checked + label {
          background: rgba(126, 34, 206, 0.5);
          border-color: rgba(126, 34, 206, 0.8);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(126, 34, 206, 0.3);
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        .form-section {
          margin-bottom: 1.5rem;
        }
        
        .rating-section, .review-section {
          grid-column: span 2;
        }
        
        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #d8b4fe;
        }
        
        .rating-stars {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .star-button {
          background: none;
          border: none;
          color: rgba(126, 34, 206, 0.2);
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }
        
        .star-button:hover {
          transform: scale(1.1);
          color: rgba(126, 34, 206, 0.6);
        }
        
        .star-button.active {
          color: #7e22ce;
        }
        
        .rating-text {
          color: #d8b4fe;
          font-size: 0.9rem;
        }
        
        .review-textarea {
          width: 100%;
          height: 120px;
          padding: 1rem;
          background: rgba(15, 5, 23, 0.5);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          resize: vertical;
          transition: all 0.3s ease;
        }
        
        .review-textarea:focus {
          border-color: rgba(126, 34, 206, 0.8);
          box-shadow: 0 0 0 3px rgba(126, 34, 206, 0.2);
          outline: none;
        }
        
        .char-counter {
          text-align: right;
          font-size: 0.8rem;
          color: #d8b4fe;
          margin-top: 0.5rem;
        }
        
        .date-input, .companions-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(15, 5, 23, 0.5);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .date-input:focus, .companions-input:focus {
          border-color: rgba(126, 34, 206, 0.8);
          box-shadow: 0 0 0 3px rgba(126, 34, 206, 0.2);
          outline: none;
        }
        
        .options-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        
        .mood-grid {
          gap: 1rem;
        }
        
        .option-button {
          padding: 0.5rem 1rem;
          background: rgba(76, 29, 149, 0.3);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 20px;
          color: #d8b4fe;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .option-button:hover {
          background: rgba(126, 34, 206, 0.4);
          transform: translateY(-2px);
        }
        
        .option-button.selected {
          background: rgba(126, 34, 206, 0.5);
          border-color: rgba(126, 34, 206, 0.8);
          color: white;
          box-shadow: 0 4px 12px rgba(126, 34, 206, 0.3);
        }
        
        .mood-button {
          flex: 1 0 calc(50% - 1rem);
          min-width: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.75rem;
        }
        
        .submit-section {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(126, 34, 206, 0.2);
        }
        
        .cancel-button {
          padding: 0.75rem 1.5rem;
          background: rgba(15, 5, 23, 0.5);
          border: 1px solid rgba(126, 34, 206, 0.3);
          border-radius: 8px;
          color: #d8b4fe;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .cancel-button:hover {
          background: rgba(76, 29, 149, 0.3);
        }
        
        .submit-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          background: linear-gradient(45deg, #4c1d95, #7e22ce);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .submit-button:hover {
          background: linear-gradient(45deg, #5b21b6, #8b5cf6);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(126, 34, 206, 0.4);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .loading-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .success-message {
          text-align: center;
          padding: 3rem 0;
        }
        
        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(45deg, #4c1d95, #7e22ce);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: white;
        }
        
        .success-message h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .success-message p {
          color: #d8b4fe;
        }
        
        @media (max-width: 768px) {
          .movie-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .movie-poster-container {
            margin-bottom: 1.5rem;
          }
          
          .movie-actions {
            justify-content: center;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .rating-section, .review-section {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}