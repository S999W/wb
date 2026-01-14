import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 flex justify-center items-center">
      <Link 
        to="/"
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 818.02 820.87"
          className="w-16 h-16"
          aria-label="Logo"
        >
          <path 
            d="M743.12,450c0,62.69-50.65,113.52-113.12,113.52S516.88,512.69,516.88,450,567.53,336.48,630,336.48,743.12,387.31,743.12,450ZM1039,450c0,226.67-183.11,410.43-409,410.43S221,676.67,221,450,404.1,39.57,630,39.57,1039,223.33,1039,450Zm-257.6,0c0-83.91-67.79-151.95-151.41-151.95s-151.41,68-151.41,152S546.38,602,630,602,781.41,533.91,781.41,450Z" 
            transform="translate(-220.99 -39.57)" 
            fill="#eaded8"
          />
        </svg>
      </Link>
    </header>
  );
};

export default Header;