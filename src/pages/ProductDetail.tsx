import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Heart, ShoppingBag, Minus, Plus, ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { cartState, wishlistState } from '../store/atoms';
import ProductCard from '../components/UI/ProductCard';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [cart, setCart] = useRecoilState(cartState);
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#111111] mb-4">Product Not Found</h2>
          <Link
            to="/products"
            className="bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#111111] transition-colors duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
  }, [product]);

  const isInWishlist = wishlist.some(item => item.id === product.id);
  
  const toggleWishlist = () => {
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    const existingItem = cart.find(item => 
      item.product.id === product.id && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );

    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, {
        product,
        quantity,
        selectedSize,
        selectedColor,
      }]);
    }
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-[#FF6B6B]">Home</Link>
          <span className="text-gray-300">/</span>
          <Link to="/products" className="text-gray-500 hover:text-[#FF6B6B]">Products</Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#111111] font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-[#FF6B6B] text-white px-3 py-1 text-sm font-bold rounded">
                  -{discountPercentage}% OFF
                </div>
              )}
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    activeImageIndex === index ? 'border-[#FF6B6B]' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-[#111111] mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-[#FF6B6B]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-[#FFD93D] text-[#FFD93D]" />
                  ))}
                </div>
                <span className="text-gray-600">(24 reviews)</span>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#111111] mb-3">Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-center transition-colors duration-300 ${
                        selectedSize === size
                          ? 'bg-[#FF6B6B] text-white border-[#FF6B6B]'
                          : 'border-gray-300 hover:border-[#FF6B6B]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#111111] mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg transition-colors duration-300 ${
                        selectedColor === color
                          ? 'bg-[#FFD93D] text-[#111111] border-[#FFD93D]'
                          : 'border-gray-300 hover:border-[#FFD93D]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#111111] mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-gray-600">Only 5 left in stock</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-[#FF6B6B] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#111111] transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`p-3 rounded-lg transition-colors duration-300 ${
                    isInWishlist
                      ? 'bg-[#FFD93D] text-[#111111]'
                      : 'bg-white text-[#111111] border border-gray-300 hover:bg-[#FFD93D]'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Truck className="h-5 w-5 text-[#FF6B6B]" />
                  <span>Free shipping on orders over ₹999</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <RotateCcw className="h-5 w-5 text-[#FF6B6B]" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Shield className="h-5 w-5 text-[#FF6B6B]" />
                  <span>2-year warranty</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-[#111111] mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;