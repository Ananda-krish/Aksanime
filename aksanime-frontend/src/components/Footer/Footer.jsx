import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Github 
} from 'lucide-react';
import logo from '../../assets/aks.jpg';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Youtube, href: '#' },
    { icon: Github, href: '#' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-12 px-4 md:px-12 relative z-[1000]"
    >
      <div className="container grid gap-8 mx-auto md:grid-cols-3">
        {/* Logo Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center md:items-start"
        >
          <img 
            src={logo} 
            alt="AKSanime Logo" 
            className="object-cover w-24 h-24 mb-4 border-2 border-white rounded-full"
          />
          <h2 className="text-2xl font-bold text-white">AKSanime</h2>
          <p className="mt-2 text-center text-gray-400 md:text-left">
            Your Premium Anime Streaming Platform
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
          <nav className="space-y-2 text-center">
            <a href="#" className="block transition-colors hover:text-red-500">Home</a>
            <a href="#" className="block transition-colors hover:text-red-500">Anime Catalog</a>
            <a href="#" className="block transition-colors hover:text-red-500">Manga</a>
            <a href="#" className="block transition-colors hover:text-red-500">About Us</a>
            <a href="#" className="block transition-colors hover:text-red-500">Contact</a>
          </nav>
        </motion.div>

        {/* Contact & Social */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <h3 className="mb-4 text-xl font-semibold">Contact & Social</h3>
          <div className="mb-4 space-y-2 text-center">
            <p>📞 +91 7012674863</p>
            <p>✉️ ebinebin54@gmail.com</p>
            <p>📍 Elappara, Peerumade, Idukki, Kerala</p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <motion.a 
                key={index}
                href={href}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-red-500"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* App Download & Copyright */}
      <motion.div 
        variants={itemVariants}
        className="pt-6 mt-8 text-center border-t border-gray-800"
      >
        <h4 className="mb-4 text-lg">Get the AKSanime App</h4>
        <div className="flex justify-center space-x-4">
          <a 
            href="#" 
            className="px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
          >
            Google Play
          </a>
          <a 
            href="#" 
            className="px-4 py-2 text-white transition-colors bg-black rounded-lg hover:bg-gray-900"
          >
            App Store
          </a>
        </div>
        
        <p className="mt-4 text-gray-500">
          © {new Date().getFullYear()} AKSanime. All Rights Reserved.
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;