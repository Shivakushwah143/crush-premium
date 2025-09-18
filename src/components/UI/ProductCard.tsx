import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { wishlistState, cartState } from '../../store/atoms';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const [cart, setCart] = useRecoilState(cartState);

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
      }]);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-[#FF6B6B] text-white px-2 py-1 text-xs font-bold rounded">
              -{discountPercentage}%
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={toggleWishlist}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isInWishlist 
                  ? 'bg-[#FFD93D] text-[#111111]' 
                  : 'bg-white text-[#111111] hover:bg-[#FFD93D]'
              }`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={addToCart}
              className="p-2 bg-[#FF6B6B] text-white rounded-full hover:bg-[#FFD93D] hover:text-[#111111] transition-colors duration-300"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#111111] mb-2 group-hover:text-[#FF6B6B] transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl font-bold text-[#FF6B6B]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {product.sizes.length} sizes available
            </div>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
              {product.colors.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{product.colors.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;