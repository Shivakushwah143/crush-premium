import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion for Fashion",
      description: "We live and breathe fashion, creating pieces that inspire confidence and self-expression."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description: "Building a community of bold individuals who aren't afraid to stand out from the crowd."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Quality Focus",
      description: "Every piece is crafted with attention to detail and made to last through countless adventures."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Innovation",
      description: "Constantly pushing boundaries in design and sustainability to create the future of fashion."
    }
  ];

  const team = [
    {
      name: "Arjun Sharma",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
      bio: "Fashion enthusiast with 10+ years in streetwear design."
    },
    {
      name: "Priya Patel",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=400&fit=crop&crop=center",
      bio: "Award-winning designer specializing in contemporary Indian fashion."
    },
    {
      name: "Raj Kumar",
      role: "Production Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=center",
      bio: "Quality control expert ensuring every piece meets our standards."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#111111] text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop&crop=center)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#111111] opacity-80"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ABOUT <span className="text-[#FFD93D]">CRUSH COLLECTION</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Born from the streets of Mumbai, we create fashion that breaks boundaries and celebrates individuality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-[#111111] mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Founded in 2020 by a group of fashion enthusiasts from Mumbai, Crush Collection was born 
                  from a simple belief: <strong>fashion should be fearless</strong>.
                </p>
                <p>
                  We noticed a gap in the Indian fashion scene - young people wanted clothing that represented 
                  their bold personalities, but couldn't find pieces that truly spoke to them. So we decided 
                  to create it ourselves.
                </p>
                <p>
                  Starting with just five designs and a small studio in Bandra, we've grown into a brand that 
                  celebrates the spirit of modern India - confident, creative, and unapologetically bold.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center"
                alt="Our Story"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-[#111111] mb-8">Our Mission</h2>
            <div className="max-w-4xl mx-auto bg-[#FF6B6B] text-white p-12 rounded-2xl">
              <p className="text-2xl font-semibold mb-6">
                "Bold fashion for bold people"
              </p>
              <p className="text-lg">
                We exist to empower young Indians to express their authentic selves through fashion. 
                Every piece we create is designed to make you feel confident, comfortable, and ready 
                to take on the world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-[#FF6B6B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#FFD93D]">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#111111] mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The creative minds behind Crush Collection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#111111] mb-1">{member.name}</h3>
                  <p className="text-[#FF6B6B] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FFD93D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-[#111111] mb-4">Join the Movement</h2>
            <p className="text-xl text-[#111111] mb-8 max-w-2xl mx-auto">
              Ready to express your bold personality? Explore our latest collection and find pieces 
              that speak to your unique style.
            </p>
            <a
              href="/products"
              className="bg-[#111111] text-white px-8 py-4 text-lg font-bold rounded-full hover:bg-[#FF6B6B] transition-colors duration-300 inline-block"
            >
              SHOP NOW
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;