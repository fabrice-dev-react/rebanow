"use client";

import React, { useState, useEffect } from 'react';
import { Play, Info, Star, ChevronLeft, ChevronRight, Search, Bell, User } from 'lucide-react';

// Type definitions
interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
}

interface HeroMovie extends Movie {
  description: string;
  year: number;
  genre: string;
}

interface MovieCategory {
  title: string;
  movies: Movie[];
}

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
}

interface MovieRowProps {
  category: MovieCategory;
  isLarge?: boolean;
}

const MovieStreamingPlatform: React.FC = () => {
  const [currentHero, setCurrentHero] = useState<number>(0);
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);

  // Sample movie data with online images
  const heroMovies: HeroMovie[] = [
    {
      id: 1,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
      rating: 9.0,
      year: 2008,
      genre: "Action, Crime, Drama"
    },
    {
      id: 2,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      image: "https://images.unsplash.com/photo-1489599505155-c8f3dc83e3b3?w=1200&h=600&fit=crop",
      rating: 8.8,
      year: 2010,
      genre: "Action, Sci-Fi, Thriller"
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&h=600&fit=crop",
      rating: 8.6,
      year: 2014,
      genre: "Adventure, Drama, Sci-Fi"
    }
  ];

  const movieCategories: MovieCategory[] = [
    {
      title: "Trending Now",
      movies: [
        { id: 4, title: "Avatar", image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop", rating: 7.8 },
        { id: 5, title: "Spider-Man", image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop", rating: 8.2 },
        { id: 6, title: "Wonder Woman", image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=300&h=450&fit=crop", rating: 7.4 },
        { id: 7, title: "Black Panther", image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=300&h=450&fit=crop", rating: 7.3 },
        { id: 8, title: "Avengers", image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=300&h=450&fit=crop", rating: 8.4 },
        { id: 9, title: "Iron Man", image: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=300&h=450&fit=crop", rating: 7.9 }
      ]
    },
    {
      title: "Action & Adventure",
      movies: [
        { id: 10, title: "Fast & Furious", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&h=450&fit=crop", rating: 6.5 },
        { id: 11, title: "Mission Impossible", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop", rating: 7.7 },
        { id: 12, title: "John Wick", image: "https://images.unsplash.com/photo-1489599505155-c8f3dc83e3b3?w=300&h=450&fit=crop", rating: 7.4 },
        { id: 13, title: "Mad Max", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: 8.1 },
        { id: 14, title: "Gladiator", image: "https://images.unsplash.com/photo-1489599505155-c8f3dc83e3b3?w=300&h=450&fit=crop", rating: 8.5 },
        { id: 15, title: "The Matrix", image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop", rating: 8.7 }
      ]
    },
    {
      title: "Sci-Fi & Fantasy",
      movies: [
        { id: 16, title: "Blade Runner", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop", rating: 8.1 },
        { id: 17, title: "Star Wars", image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop", rating: 8.6 },
        { id: 18, title: "Dune", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: 8.0 },
        { id: 19, title: "Ex Machina", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop", rating: 7.7 },
        { id: 20, title: "Arrival", image: "https://images.unsplash.com/photo-1489599505155-c8f3dc83e3b3?w=300&h=450&fit=crop", rating: 7.9 },
        { id: 21, title: "Gravity", image: "https://images.unsplash.com/photo-1446776627055-dcef419b1c3c?w=300&h=450&fit=crop", rating: 7.7 }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev: number) => (prev + 1) % heroMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroMovies.length]);

  const MovieCard: React.FC<MovieCardProps> = ({ movie, isLarge = false }) => (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 ${
        isLarge ? 'min-w-80 h-48' : 'min-w-60 h-36'
      }`}
      onMouseEnter={() => setHoveredMovie(movie.id)}
      onMouseLeave={() => setHoveredMovie(null)}
    >
      <img 
        src={movie.image} 
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {hoveredMovie === movie.id && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm">{movie.rating.toFixed(1)}</span>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-1">
              <Play className="w-3 h-3" />
              <span>Play</span>
            </button>
            <button className="bg-gray-600/80 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-500 transition-colors flex items-center space-x-1">
              <Info className="w-3 h-3" />
              <span>Info</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const MovieRow: React.FC<MovieRowProps> = ({ category, isLarge = false }) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    
    const scroll = (direction: 'left' | 'right'): void => {
      const scrollAmount = direction === 'left' ? -300 : 300;
      setScrollPosition((prev: number) => Math.max(0, prev + scrollAmount));
    };

    return (
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold mb-4 px-4">{category.title}</h2>
        <div className="relative group">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            type="button"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            type="button"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="overflow-hidden px-4">
            <div 
              className="flex space-x-4 transition-transform duration-300"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {category.movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} isLarge={isLarge} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleHeroNavigation = (index: number): void => {
    setCurrentHero(index);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-transparent transition-all duration-300 hover:bg-black/90">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-red-500 text-3xl font-bold">CINEMAX</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
              <a href="#" className="hover:text-gray-300 transition-colors">TV Shows</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Movies</a>
              <a href="#" className="hover:text-gray-300 transition-colors">New & Popular</a>
              <a href="#" className="hover:text-gray-300 transition-colors">My List</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 cursor-pointer hover:text-gray-300" />
            <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300" />
            <User className="w-8 h-8 bg-red-500 rounded p-1 cursor-pointer hover:bg-red-600" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroMovies[currentHero].image}
            alt={heroMovies[currentHero].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 flex items-center h-full px-6">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
              {heroMovies[currentHero].title}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-red-600 px-2 py-1 rounded text-sm font-semibold">HD</span>
              <span className="text-green-400 font-semibold">{heroMovies[currentHero].rating.toFixed(1)}/10</span>
              <span className="text-gray-300">{heroMovies[currentHero].year}</span>
              <span className="text-gray-300">{heroMovies[currentHero].genre}</span>
            </div>
            <p className="text-lg mb-8 drop-shadow text-gray-200 leading-relaxed">
              {heroMovies[currentHero].description}
            </p>
            <div className="flex space-x-4">
              <button 
                className="bg-white text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors flex items-center space-x-2 shadow-lg"
                type="button"
              >
                <Play className="w-6 h-6" />
                <span>Play</span>
              </button>
              <button 
                className="bg-gray-600/80 backdrop-blur text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-500/80 transition-colors flex items-center space-x-2"
                type="button"
              >
                <Info className="w-6 h-6" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-20 left-6 flex space-x-2">
          {heroMovies.map((_, index: number) => (
            <button
              key={index}
              onClick={() => handleHeroNavigation(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentHero ? 'bg-white' : 'bg-white/50'
              }`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Movie Categories */}
      <div className="relative z-10 -mt-32 pb-12">
        {movieCategories.map((category: MovieCategory, index: number) => (
          <MovieRow 
            key={category.title} 
            category={category} 
            isLarge={index === 0}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-black/50 py-12 px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-red-500 text-2xl font-bold mb-4">CINEMAX</h3>
              <p className="text-gray-400">Your premium destination for movies and TV shows.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CINEMAX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MovieStreamingPlatform;