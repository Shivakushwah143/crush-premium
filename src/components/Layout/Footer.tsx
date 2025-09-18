import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#FF6B6B]">Crush</span>
              <span className="text-white"> Collection</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Bold fashion for bold people. We create streetwear that speaks to your personality and style. 
              Express yourself with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-[#FF6B6B] p-2 rounded-full hover:bg-[#FFD93D] transition-colors duration-300">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-[#FF6B6B] p-2 rounded-full hover:bg-[#FFD93D] transition-colors duration-300">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-[#FF6B6B] p-2 rounded-full hover:bg-[#FFD93D] transition-colors duration-300">
                <Twitter className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FFD93D]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300">Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300">Contact</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300">Cart</Link></li>
              <li><Link to="/wishlist" className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300">Wishlist</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FFD93D]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[#FF6B6B]" />
                <span className="text-gray-400 text-sm">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#FF6B6B]" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#FF6B6B]" />
                <span className="text-gray-400 text-sm">info@crushcollection.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Crush Collection. All rights reserved. Made with <span className="text-[#FF6B6B]">❤️</span> in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;