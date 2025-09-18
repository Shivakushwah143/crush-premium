import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Heart, ShoppingBag } from 'lucide-react';
import { wishlistState, cartState } from '../store/atoms';
import { motion } from 'framer-motion';

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const [cart, setCart] = useRecoilState(cartState);

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const moveToCart = (product: any) => {
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
    
    removeFromWishlist(product.id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">💔</div>
          <h2 className="text-3xl font-bold text-[#111111] mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Add some products you love to your wishlist.</p>
          <Link
            to="/products"
            className="bg-[#FF6B6B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#111111] transition-colors duration-300 inline-flex items-center space-x-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Start Shopping</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#111111]">My Wishlist</h1>
          <button
            onClick={clearWishlist}
            className="text-[#FF6B6B] hover:underline text-sm"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-[#FF6B6B] text-white px-2 py-1 text-xs font-bold rounded">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#111111] mb-2 group-hover:text-[#FF6B6B] transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-[#FF6B6B]">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <div className="p-4 pt-0 flex space-x-2">
                <button
                  onClick={() => moveToCart(product)}
                  className="flex-1 bg-[#FF6B6B] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#111111] transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 border-2 border-[#FF6B6B] text-[#FF6B6B] rounded-lg hover:bg-[#FF6B6B] hover:text-white transition-colors duration-300"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;