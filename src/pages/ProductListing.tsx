import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import { filterState } from '../store/atoms';
import ProductCard from '../components/UI/ProductCard';
import { motion } from 'framer-motion';

const ProductListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useRecoilState(filterState);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryFromUrl = searchParams.get('category') || 'all';

  useEffect(() => {
    if (categoryFromUrl !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    }
  }, [categoryFromUrl, filters.category, setFilters]);

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes.includes(size))) {
      return false;
    }
    if (filters.colors.length > 0 && !filters.colors.some(color => product.colors.includes(color))) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: categoryFromUrl,
      priceRange: [0, 10000],
      sizes: [],
      colors: [],
      sortBy: 'name',
    });
  };

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = ['Black', 'White', 'Grey', 'Navy', 'Red', 'Pink', 'Blue', 'Gold', 'Silver'];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111111] mb-2">
              {categoryFromUrl === 'all' ? 'All Products' : 
               categoryFromUrl === 'men' ? 'Men\'s Collection' :
               categoryFromUrl === 'women' ? 'Women\'s Collection' :
               'Accessories'}
            </h1>
            <p className="text-gray-600">{sortedProducts.length} products found</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#FF6B6B] text-white' : 'text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#FF6B6B] text-white' : 'text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-[#111111] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B6B] transition-colors duration-300"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-80 bg-white rounded-lg shadow-lg p-6 h-fit ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#111111]">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-[#FF6B6B] hover:underline text-sm"
              >
                Clear All
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-[#111111] mb-3">Price Range</h4>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [+e.target.value, filters.priceRange[1]])}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], +e.target.value])}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h4 className="font-medium text-[#111111] mb-3">Sizes</h4>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      const newSizes = filters.sizes.includes(size)
                        ? filters.sizes.filter(s => s !== size)
                        : [...filters.sizes, size];
                      handleFilterChange('sizes', newSizes);
                    }}
                    className={`px-3 py-1 border rounded text-sm transition-colors duration-300 ${
                      filters.sizes.includes(size)
                        ? 'bg-[#FF6B6B] text-white border-[#FF6B6B]'
                        : 'border-gray-300 hover:border-[#FF6B6B]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h4 className="font-medium text-[#111111] mb-3">Colors</h4>
              <div className="grid grid-cols-3 gap-2">
                {allColors.map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      const newColors = filters.colors.includes(color)
                        ? filters.colors.filter(c => c !== color)
                        : [...filters.colors, color];
                      handleFilterChange('colors', newColors);
                    }}
                    className={`px-3 py-1 border rounded text-sm transition-colors duration-300 ${
                      filters.colors.includes(color)
                        ? 'bg-[#FFD93D] text-[#111111] border-[#FFD93D]'
                        : 'border-gray-300 hover:border-[#FFD93D]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-[#111111] mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#111111] transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
                }
              >
                {sortedProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;