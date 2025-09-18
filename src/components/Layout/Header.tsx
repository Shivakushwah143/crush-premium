import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { cartCountSelector, wishlistCountSelector } from '../../store/selectors';
import { useState } from 'react';

const Header: React.FC = () => {
  const location = useLocation();
  const cartCount = useRecoilValue(cartCountSelector);
  const wishlistCount = useRecoilValue(wishlistCountSelector);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Men', href: '/products?category=men' },
    { name: 'Women', href: '/products?category=women' },
    { name: 'Accessories', href: '/products?category=accessories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href.split('?')[0]);
  };

  return (
    <header className="bg-[#111111] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-[#FF6B6B]">Crush</span>
              <span className="text-white"> Collection</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-[#FFD93D] border-b-2 border-[#FFD93D]'
                    : 'text-white hover:text-[#FF6B6B]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-[#FF6B6B] transition-colors duration-300 rounded-full">
              <Search className="h-5 w-5" />
            </button>
            
            <Link
              to="/wishlist"
              className="p-2 hover:bg-[#FF6B6B] transition-colors duration-300 rounded-full relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFD93D] text-[#111111] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="p-2 hover:bg-[#FF6B6B] transition-colors duration-300 rounded-full relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFD93D] text-[#111111] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-[#FF6B6B] transition-colors duration-300 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-[#FFD93D] bg-[#FF6B6B] rounded'
                      : 'text-white hover:text-[#FF6B6B] hover:bg-gray-800 rounded'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;