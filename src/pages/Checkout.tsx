import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { Lock, CreditCard, MapPin, User, Phone, Mail } from 'lucide-react';
import { cartState } from '../store/atoms';
import { cartTotalSelector } from '../store/selectors';

const Checkout: React.FC = () => {
  const cart = useRecoilValue(cartState);
  const total = useRecoilValue(cartTotalSelector);
  const setCart = useSetRecoilState(cartState);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Payment Information
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!formData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    setTimeout(() => {
      alert('Order placed successfully! You will receive a confirmation email shortly.');
      setCart([]);
      // In a real app, you would redirect to an order confirmation page
    }, 1000);
  };

  const shipping = total >= 999 ? 0 : 99;
  const tax = Math.round(total * 0.18);
  const finalTotal = total + shipping + tax;

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#111111] mb-4">Your cart is empty</h2>
          <a
            href="/products"
            className="bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#111111] transition-colors duration-300"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber
                      ? 'bg-[#FF6B6B] text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`ml-3 font-medium ${
                    step >= stepNumber ? 'text-[#111111]' : 'text-gray-500'
                  }`}
                >
                  {stepNumber === 1 ? 'Shipping' : stepNumber === 2 ? 'Payment' : 'Review'}
                </span>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      step > stepNumber ? 'bg-[#FF6B6B]' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div>
                  <div className="flex items-center mb-6">
                    <MapPin className="h-6 w-6 text-[#FF6B6B] mr-3" />
                    <h2 className="text-2xl font-bold text-[#111111]">Shipping Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter full address"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter city"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter pincode"
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <CreditCard className="h-6 w-6 text-[#FF6B6B] mr-3" />
                    <h2 className="text-2xl font-bold text-[#111111]">Payment Information</h2>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="h-5 w-5" /> },
                        { id: 'upi', name: 'UPI', icon: '₹' },
                        { id: 'cod', name: 'Cash on Delivery', icon: '💰' }
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                            formData.paymentMethod === method.id
                              ? 'border-[#FF6B6B] bg-[#FF6B6B] bg-opacity-10'
                              : 'border-gray-300 hover:border-[#FF6B6B]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="flex items-center justify-center space-x-2">
                            {typeof method.icon === 'string' ? (
                              <span className="text-xl">{method.icon}</span>
                            ) : (
                              method.icon
                            )}
                            <span className="font-medium">{method.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Card Details */}
                  {formData.paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                            errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter name as on card"
                        />
                        {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>}
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'upi' && (
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                      <div className="text-4xl mb-4">📱</div>
                      <h3 className="text-lg font-semibold mb-2">UPI Payment</h3>
                      <p className="text-gray-600">You will be redirected to your UPI app to complete the payment.</p>
                    </div>
                  )}

                  {formData.paymentMethod === 'cod' && (
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                      <div className="text-4xl mb-4">💰</div>
                      <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
                      <p className="text-gray-600">Pay when your order is delivered to your doorstep.</p>
                      <p className="text-sm text-[#FF6B6B] mt-2">Additional ₹50 COD charges apply</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div>
                  <div className="flex items-center mb-6">
                    <User className="h-6 w-6 text-[#FF6B6B] mr-3" />
                    <h2 className="text-2xl font-bold text-[#111111]">Review Your Order</h2>
                  </div>

                  {/* Shipping Information Review */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-3">Shipping Address</h3>
                    <p className="text-sm text-gray-600">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.pincode}<br />
                      {formData.phone} | {formData.email}
                    </p>
                  </div>

                  {/* Payment Method Review */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-3">Payment Method</h3>
                    <p className="text-sm text-gray-600">
                      {formData.paymentMethod === 'card' ? 'Credit/Debit Card' :
                       formData.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Order Items</h3>
                    {cart.map(item => (
                      <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">
                            Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border-2 border-[#FF6B6B] text-[#FF6B6B] rounded-lg font-semibold hover:bg-[#FF6B6B] hover:text-white transition-colors duration-300"
                  >
                    Back
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="ml-auto px-6 py-3 bg-[#FF6B6B] text-white rounded-lg font-semibold hover:bg-[#111111] transition-colors duration-300"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="ml-auto px-8 py-3 bg-[#FFD93D] text-[#111111] rounded-lg font-bold hover:bg-[#FF6B6B] hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Lock className="h-5 w-5" />
                    <span>Place Order</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[#111111] mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.selectedSize} | {item.selectedColor} | x{item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST):</span>
                  <span className="font-semibold">₹{tax.toLocaleString()}</span>
                </div>
                {formData.paymentMethod === 'cod' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">COD Charges:</span>
                    <span className="font-semibold">₹50</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-[#FF6B6B]">
                  ₹{(finalTotal + (formData.paymentMethod === 'cod' ? 50 : 0)).toLocaleString()}
                </span>
              </div>

              <div className="mt-6 p-4 bg-[#FFD93D] bg-opacity-20 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-[#111111]">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;