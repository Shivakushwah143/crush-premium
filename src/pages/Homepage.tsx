import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Shield } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/UI/ProductCard';

const Homepage: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);

  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
      href: '/products?category=men',
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1717658091897-6e1d024c2d9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
      href: '/products?category=women',
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
      href: '/products?category=accessories',
    },
  ];

  const lookbookImages = [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=800&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&h=800&fit=crop&crop=center)',
          }}
        >
          <div className="absolute inset-0 bg-[#FF6B6B] bg-opacity-70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              BOLD FASHION
              <br />
              <span className="text-[#FFD93D]">FOR BOLD PEOPLE</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Express yourself with confidence. Discover streetwear that speaks to your personality.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-[#FFD93D] text-[#111111] px-8 py-4 text-lg font-bold rounded-full hover:bg-white transition-colors duration-300 group"
            >
              SHOP NOW
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#111111] mb-4">SHOP BY CATEGORY</h2>
            <p className="text-lg text-gray-600">Find your perfect style</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={category.href}>
                  <div className=" h-60 w-60 rounded-full overflow-hidden shadow-lg border-4 border-transparent group-hover:border-[#FFD93D] transition-all duration-300 mx-auto max-w-xs">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-center mt-6 text-[#111111] group-hover:text-[#FF6B6B] transition-colors duration-300">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#111111] mb-4">FEATURED PRODUCTS</h2>
            <p className="text-lg text-gray-600">Handpicked favorites just for you</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-[#FF6B6B] text-white px-8 py-3 font-semibold rounded-full hover:bg-[#111111] transition-colors duration-300"
            >
              VIEW ALL PRODUCTS
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">LIFESTYLE LOOKBOOK</h2>
            <p className="text-lg text-gray-400">Get inspired by our latest collections</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lookbookImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt={`Lookbook ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#FF6B6B] bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-[#FF6B6B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">PREMIUM QUALITY</h3>
              <p className="text-gray-600">Made with finest materials and attention to detail</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-[#FFD93D] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-[#111111]" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">FAST DELIVERY</h3>
              <p className="text-gray-600">Quick shipping across India with reliable partners</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-[#FF6B6B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">SECURE PAYMENT</h3>
              <p className="text-gray-600">100% secure transactions with multiple payment options</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;