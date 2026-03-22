import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Info, Lightbulb, Puzzle } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Story', path: '/story', icon: <BookOpen size={18} /> },
    { name: 'Themes', path: '/themes', icon: <Lightbulb size={18} /> },
    { name: 'Activities', path: '/activities', icon: <Puzzle size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 font-bold text-xl tracking-tight text-emerald-400">
              Te Tahi-o-Te-Rā
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Mobile menu button could go here, but keeping it simple as requested */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
