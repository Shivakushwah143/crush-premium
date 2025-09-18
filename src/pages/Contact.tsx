import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Users } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Our Store",
      details: ["Bandra West, Mumbai", "Maharashtra, India", "400050"],
      color: "bg-[#FF6B6B]"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 87654 32109", "Mon-Sat: 10AM-8PM"],
      color: "bg-[#FFD93D] text-[#111111]"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["info@crushcollection.in", "support@crushcollection.in", "We reply within 24 hours"],
      color: "bg-[#FF6B6B]"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "WhatsApp",
      details: ["+91 98765 43210", "Quick replies", "Available 24/7"],
      color: "bg-green-500"
    }
  ];

  const faqs = [
    {
      question: "What are your store hours?",
      answer: "We're open Monday to Saturday from 10 AM to 8 PM. Closed on Sundays and public holidays."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We're working on expanding to international markets soon!"
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for unworn items with tags attached. See our return policy page for details."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships. You can track your package on our website."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Hero Section */}
      <section className="bg-[#111111] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              GET IN <span className="text-[#FFD93D]">TOUCH</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our products or need style advice? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className={`${info.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-[#111111] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] transition-colors duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] transition-colors duration-300 resize-none"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF6B6B] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#111111] transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-[#111111] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-[#111111] mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[#FFD93D] bg-opacity-20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-6 w-6 text-[#FF6B6B] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#111111] mb-2">Need Quick Help?</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Chat with us on WhatsApp for instant support and style advice!
                    </p>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 text-sm"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Store Hours & Team */}
      <section className="py-16 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Clock className="h-8 w-8 text-[#FFD93D] mr-3" />
                <h3 className="text-2xl font-bold">Store Hours</h3>
              </div>
              <div className="space-y-2 mb-6">
                <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                <p>Sunday: Closed</p>
                <p className="text-[#FFD93D]">Extended hours during festivals!</p>
              </div>
              <p className="text-gray-300">
                Visit our flagship store in Bandra to experience our full collection and get personalized styling advice from our fashion experts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Users className="h-8 w-8 text-[#FF6B6B] mr-3" />
                <h3 className="text-2xl font-bold">Our Team</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Our passionate team of fashion experts is here to help you find the perfect pieces that match your style and personality.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-[#FFD93D]">Style Consultants</p>
                  <p className="text-gray-300">Personal styling advice</p>
                </div>
                <div>
                  <p className="font-semibold text-[#FFD93D]">Customer Care</p>
                  <p className="text-gray-300">Order support & returns</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;