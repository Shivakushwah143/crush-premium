import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { cartState } from '../store/atoms';
import { cartTotalSelector } from '../store/selectors';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const total = useRecoilValue(cartTotalSelector);

  const updateQuantity = (productId: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart(cart.map(item => 
      item.product.id === productId && 
      item.selectedSize === size && 
      item.selectedColor === color
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart(cart.filter(item => 
      !(item.product.id === productId && 
        item.selectedSize === size && 
        item.selectedColor === color)
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-[#111111] mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
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
          <h1 className="text-3xl font-bold text-[#111111]">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-[#FF6B6B] hover:underline text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-lg font-semibold text-[#111111] hover:text-[#FF6B6B] transition-colors duration-300"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-sm text-gray-600 mt-1">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </div>
                    <div className="text-xl font-bold text-[#FF6B6B] mt-2">
                      ₹{item.product.price}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(
                          item.product.id, 
                          item.selectedSize, 
                          item.selectedColor, 
                          item.quantity - 1
                        )}
                        className="p-2 hover:bg-gray-100 transition-colors duration-300"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(
                          item.product.id, 
                          item.selectedSize, 
                          item.selectedColor, 
                          item.quantity + 1
                        )}
                        className="p-2 hover:bg-gray-100 transition-colors duration-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(
                        item.product.id, 
                        item.selectedSize, 
                        item.selectedColor
                      )}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-lg font-bold text-[#111111]">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#111111] mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">
                    {total >= 999 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      '₹99'
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">₹{Math.round(total * 0.18).toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-[#FF6B6B]">
                    ₹{(total + Math.round(total * 0.18) + (total >= 999 ? 0 : 99)).toLocaleString()}
                  </span>
                </div>
              </div>

              {total < 999 && (
                <div className="bg-[#FFD93D] bg-opacity-20 p-3 rounded-lg mb-6">
                  <p className="text-sm text-[#111111]">
                    Add ₹{(999 - total).toLocaleString()} more for free shipping!
                  </p>
                </div>
              )}

              <Link
                to="/checkout"
                className="w-full bg-[#FFD93D] text-[#111111] py-3 px-6 rounded-lg font-bold hover:bg-[#FF6B6B] hover:text-white transition-colors duration-300 block text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="w-full mt-3 border-2 border-[#FF6B6B] text-[#FF6B6B] py-3 px-6 rounded-lg font-semibold hover:bg-[#FF6B6B] hover:text-white transition-colors duration-300 block text-center"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;