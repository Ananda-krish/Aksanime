import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Globe, 
  CheckCircle, 
  Star, 
  Target, 
  Shield, 
  Film, 
  BookOpen, 
  Shirt, 
  ToyBrick,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { Link } from 'react-router-dom';


// Sample images - replace with your actual images
import ownerImage from "../../assets/black.jpg";
import anime1 from "../../assets/black.jpg";
import anime2 from "../../assets/black.jpg";
import anime3 from "../../assets/black.jpg";
import anime4 from "../../assets/black.jpg";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const team = [
  {
    name: 'Anandakrishnan',
    position: 'Founder & CEO',
    image: ownerImage,
    description: 'A passionate anime enthusiast with over a decade of experience in the industry. Anandakrishnan founded Aksanime to create a one-stop destination for anime lovers worldwide.',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      youtube: '#'
    }
  },
  {
    name: 'Rin Okumura',
    position: 'Content Curator',
    image: anime1,
    description: 'Our anime expert who ensures we bring you the best and latest anime content. With an encyclopedic knowledge of anime, Rin keeps our library fresh and exciting.',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      youtube: '#'
    }
  },
  {
    name: 'Nezuko Kamado',
    position: 'Product Manager',
    image: anime2,
    description: 'Oversees our merchandise collection, ensuring we offer high-quality anime products that fans will love. From clothing to collectibles, Nezuko has you covered.',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      youtube: '#'
    }
  },
  {
    name: 'Tanjiro Kamado',
    position: 'Customer Support',
    image: anime3,
    description: 'Leads our customer service team with dedication and care. Tanjiro ensures every Aksanime customer has a smooth and enjoyable experience.',
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      youtube: '#'
    }
  },
];

const values = [
  {
    icon: Star,
    title: 'Passion for Anime',
    description: 'We share your love for anime and are committed to bringing you the best content and products.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Target,
    title: 'Quality First',
    description: 'Every anime we stream and product we sell meets our high standards of quality.',
    color: 'from-blue-500 to-teal-400'
  },
  {
    icon: Shield,
    title: 'Fan Community',
    description: 'We prioritize building a community where anime fans can connect and share their passion.',
    color: 'from-amber-500 to-orange-500'
  },
];

const services = [
  {
    icon: Film,
    title: 'Anime Streaming',
    description: 'Thousands of anime titles available for streaming in high quality with multiple language options.',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    icon: BookOpen,
    title: 'Manga & Books',
    description: 'Official manga, light novels, and art books from your favorite anime series.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Shirt,
    title: 'Anime Apparel',
    description: 'High-quality clothing featuring designs from popular anime shows and characters.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: ToyBrick,
    title: 'Collectibles',
    description: 'Action figures, plushies, and other collectible items for serious anime fans.',
    color: 'bg-amber-100 text-amber-600'
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardHover = {
  rest: { 
    scale: 1,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: { 
    scale: 1.03,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const imageHover = {
  rest: { scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { scale: 1.08, transition: { duration: 0.4, ease: "easeOut" } }
};

const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const textVariant = (delay) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
      delay,
    },
  },
});

const GoogleMap = () => (
  <div className="overflow-hidden shadow-xl rounded-2xl h-80">
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31495.542061567!2d77.0622884!3d9.7471336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07a3d9c1e1b5d5%3A0x1f1b5b5b5b5b5b5b!2sElappara%2C%20Kerala!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      allowFullScreen="" 
      loading="lazy"
      title="Aksanime Location"
    ></iframe>
  </div>
);

const SocialLink = ({ icon: Icon, href, color }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-10 h-10 rounded-full ${color} text-white`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16 md:pt-0 md:pl-24"> {/* Adjust padding to account for vertical navbar */}
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden text-white bg-gradient-to-r from-purple-900 to-indigo-800">
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute inset-0 z-0 opacity-20"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1 
                className="mb-6 text-4xl font-bold md:text-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                About Aksanime
              </motion.h1>
              <motion.p 
                className="max-w-3xl mx-auto text-xl md:text-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Your ultimate destination for anime streaming and merchandise
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white md:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid items-center grid-cols-1 gap-12 md:grid-cols-2"
            >
              <motion.div variants={fadeInLeft}>
                <h2 className="relative mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                  Our Story
                  <span className="absolute bottom-0 left-0 w-20 h-1 bg-purple-600 rounded-full"></span>
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Founded in 2020 by Anandakrishnan, Aksanime began as a passion project to create a dedicated platform for anime lovers in India. What started as a small streaming site has now grown into a comprehensive anime ecosystem.
                </p>
                <p className="mb-6 text-lg text-gray-600">
                  We recognized the growing demand for legal, high-quality anime content and authentic merchandise in the Indian market. Our mission is to bridge the gap between Japanese anime culture and Indian fans.
                </p>
                <p className="text-lg text-gray-600">
                  Today, Aksanime offers thousands of anime titles, a wide range of merchandise, and a thriving community of anime enthusiasts across the country.
                </p>
              </motion.div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  {
                    icon: Award,
                    value: '3+',
                    label: 'Years Experience',
                    color: 'bg-indigo-50 text-indigo-600',
                  },
                  {
                    icon: Users,
                    value: '50,000+',
                    label: 'Happy Customers',
                    color: 'bg-emerald-50 text-emerald-600',
                  },
                  {
                    icon: Globe,
                    value: '1000+',
                    label: 'Anime Titles',
                    color: 'bg-blue-50 text-blue-600',
                  },
                  {
                    icon: CheckCircle,
                    value: '98%',
                    label: 'Satisfaction Rate',
                    color: 'bg-amber-50 text-amber-600',
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className={`p-6 text-center rounded-2xl ${stat.color} transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    <motion.div
                      initial={{ rotateY: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <stat.icon className="w-10 h-10 mx-auto mb-4" />
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="text-sm">{stat.label}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Colorful Services Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <h2 className="relative inline-block mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                What We Offer
                <span className="absolute w-24 h-1 transform -translate-x-1/2 bg-purple-600 rounded-full -bottom-2 left-1/2"></span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                Comprehensive anime services tailored for true otakus
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover="hover"
                  initial="rest"
                  className="group"
                >
                  <motion.div
                    variants={cardHover}
                    className={`relative p-8 overflow-hidden transition-all duration-300 transform bg-white shadow-sm rounded-2xl group-hover:shadow-xl ${service.color.replace('text', 'hover:text')}`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 -mt-12 -mr-12 transition-all duration-300 rounded-bl-full bg-opacity-20 group-hover:bg-opacity-30" style={{ backgroundColor: service.color.split(' ')[0].replace('bg-', '').replace('-100', '-500') }}></div>
                    <service.icon className={`relative z-10 mb-6 w-14 h-14 ${service.color}`} />
                    <h3 className="relative z-10 mb-4 text-2xl font-semibold">{service.title}</h3>
                    <p className="relative z-10 text-gray-600">{service.description}</p>
                    <div className="w-full h-1 mt-6 overflow-hidden bg-gray-100 rounded-full">
                      <motion.div 
                        className={`h-full rounded-full ${service.color.split(' ')[0]}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${70 + index * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Values with Gradient Cards */}
        <section className="py-16 bg-white md:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <h2 className="relative inline-block mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Our Values
                <span className="absolute w-24 h-1 transform -translate-x-1/2 bg-purple-600 rounded-full -bottom-2 left-1/2"></span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover="hover"
                  initial="rest"
                >
                  <motion.div
                    variants={cardHover}
                    className={`relative p-8 overflow-hidden text-center bg-white shadow-sm rounded-2xl bg-gradient-to-br ${value.color} text-white`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-30 bg-gradient-to-br from-black to-transparent group-hover:opacity-40"></div>
                    <div className="relative flex flex-col items-center">
                      <div className="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-300 transform bg-white rounded-full bg-opacity-20 hover:scale-110">
                        <value.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="mb-4 text-2xl font-semibold">{value.title}</h3>
                      <p className="text-white text-opacity-90">{value.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Team with Social Links */}
        <section className="py-16 bg-gray-50 md:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <h2 className="relative inline-block mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Our Team
                <span className="absolute w-24 h-1 transform -translate-x-1/2 bg-purple-600 rounded-full -bottom-2 left-1/2"></span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                The otakus who make Aksanime possible
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeInUp}
                  whileHover="hover"
                  initial="rest"
                  className="group"
                >
                  <motion.div
                    variants={cardHover}
                    className="overflow-hidden transition-all duration-300 transform bg-white shadow-sm rounded-2xl"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    <motion.div
                      className="relative overflow-hidden h-80 sm:h-96"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div 
                        className="absolute inset-0 z-10 transition-opacity duration-300 bg-purple-900 opacity-0 bg-opacity-20 group-hover:opacity-100"
                      />
                      <motion.div
                        variants={imageHover}
                        className="w-full h-full transition-transform duration-700 transform bg-center bg-cover"
                        style={{ backgroundImage: `url(${member.image})` }}
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-purple-900 to-transparent h-1/3 group-hover:opacity-100"
                      />
                      <motion.div
                        className="absolute left-0 right-0 z-30 text-center text-white transition-all duration-300 transform translate-y-10 opacity-0 bottom-4 group-hover:opacity-100 group-hover:translate-y-0"
                      >
                        <p className="text-sm font-medium">Connect with {member.name.split(' ')[0]}</p>
                        <div className="flex justify-center mt-2 space-x-3">
                          <SocialLink 
                            icon={Facebook} 
                            href={member.social.facebook} 
                            color="bg-blue-600" 
                          />
                          <SocialLink 
                            icon={Instagram} 
                            href={member.social.instagram} 
                            color="bg-pink-600" 
                          />
                          <SocialLink 
                            icon={Twitter} 
                            href={member.social.twitter} 
                            color="bg-blue-400" 
                          />
                          <SocialLink 
                            icon={Youtube} 
                            href={member.social.youtube} 
                            color="bg-red-600" 
                          />
                        </div>
                      </motion.div>
                    </motion.div>

                    <div className="p-6">
                      <div className="flex items-center mb-2 space-x-2">
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <motion.div 
                          className="w-2 h-2 bg-purple-600 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1] 
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        />
                      </div>
                      <p className="mb-4 font-medium text-purple-600">{member.position}</p>
                      <p className="text-sm text-gray-600">{member.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact & Location Section */}
        <section className="py-16 bg-white md:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid items-center grid-cols-1 gap-12 md:grid-cols-2"
            >
              <motion.div variants={fadeInLeft}>
                <h2 className="relative mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                  Get In Touch
                  <span className="absolute bottom-0 left-0 w-20 h-1 bg-purple-600 rounded-full"></span>
                </h2>
                
                <motion.div variants={staggerContainer} className="space-y-6">
                  <motion.div 
                    variants={textVariant(0.1)}
                    className="flex items-start p-4 transition-all duration-300 rounded-lg bg-gray-50 hover:bg-purple-50"
                  >
                    <div className="flex-shrink-0 p-3 mr-4 text-white bg-purple-600 rounded-full">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600">+91 7012674863</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={textVariant(0.2)}
                    className="flex items-start p-4 transition-all duration-300 rounded-lg bg-gray-50 hover:bg-purple-50"
                  >
                    <div className="flex-shrink-0 p-3 mr-4 text-white bg-purple-600 rounded-full">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">ebinebin54@gmail.com</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={textVariant(0.3)}
                    className="flex items-start p-4 transition-all duration-300 rounded-lg bg-gray-50 hover:bg-purple-50"
                  >
                    <div className="flex-shrink-0 p-3 mr-4 text-white bg-purple-600 rounded-full">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Address</h3>
                      <p className="text-gray-600">Elappara, Peerumade, Idukki, Kerala</p>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  variants={textVariant(0.4)}
                  className="mt-8"
                >
                  <h3 className="mb-4 text-xl font-semibold">Follow Us</h3>
                  <div className="flex space-x-4">
                    <SocialLink 
                      icon={Facebook} 
                      href="#" 
                      color="bg-blue-600 hover:bg-blue-700" 
                    />
                    <SocialLink 
                      icon={Instagram} 
                      href="#" 
                      color="bg-pink-600 hover:bg-pink-700" 
                    />
                    <SocialLink 
                      icon={Twitter} 
                      href="#" 
                      color="bg-blue-400 hover:bg-blue-500" 
                    />
                    <SocialLink 
                      icon={Youtube} 
                      href="#" 
                      color="bg-red-600 hover:bg-red-700" 
                    />
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div variants={fadeInRight} className="h-full">
                <GoogleMap />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-16 overflow-hidden text-white md:py-24 bg-gradient-to-r from-purple-900 to-indigo-800">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }} />
          
          <div className="relative z-10 max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Dive Into Anime?</h2>
              <p className="max-w-3xl mx-auto mb-10 text-xl text-purple-100">
                Join thousands of anime fans enjoying premium content and exclusive merchandise.
              </p>
              <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <motion.button 
                    className="px-8 py-4 font-semibold text-purple-600 transition-colors duration-300 transform bg-white rounded-full shadow-lg hover:bg-purple-50 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Start Free Trial
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button 
                    className="px-8 py-4 font-semibold text-white transition-colors duration-300 transform border-2 border-white rounded-full shadow-lg hover:bg-white hover:bg-opacity-10 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}