import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
    FaFacebook, 
    FaTwitter, 
    FaInstagram, 
    FaYoutube, 
    FaTiktok, 
    FaLinkedin,
    FaMapMarkerAlt 
} from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// Variants for staggered animations
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
            duration: 0.5
        }
    }
};

const socialLinks = [
    { 
        icon: FaFacebook, 
        link: "https://facebook.com/aksanime", 
        color: "text-blue-600" 
    },
    // ... (previous social links remain the same)
];

export default function AksanimeContact() {
    const ref = useRef(null);
    const formRef = useRef(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const isInView = useInView(ref, { margin: "-100px" });

    const sendEmail = (e) => {
        e.preventDefault();
        
        emailjs
            .sendForm('service_suvk6ac',
                'template_4ncthz4', formRef.current, {
                publicKey: 'dV2JMuviSOBB8G5c1',
            })
            .then(
                () => {
                    setSuccess(true);
                    alert('Message Sent Successfully');
                    formRef.current.reset();
                    setTimeout(() => setSuccess(false), 5000);
                },
                (error) => {
                    setError(true);
                    alert('Cannot send message now');
                    setTimeout(() => setError(false), 5000);
                }
            );
    };

    return (
        <div className="flex flex-col min-h-screen text-white bg-gradient-to-br from-gray-900 to-black">
        <Navbar />

        <motion.div 
            ref={ref}
            className="container flex-grow px-4 py-16 mx-auto lg:px-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left Column - Contact Info & Social Links */}
                    <motion.div 
                        className="space-y-8"
                        variants={containerVariants}
                    >
                        <motion.h1 
                            className="text-4xl font-bold md:text-6xl"
                            variants={itemVariants}
                        >
                            Contact <span className="text-orange-500">Aksanime</span>
                        </motion.h1>

                        <motion.div 
                            className="space-y-6"
                            variants={containerVariants}
                        >
                            {/* Contact Details with Staggered Animations */}
                            <motion.div 
                                className="space-y-2"
                                variants={itemVariants}
                            >
                                <h2 className="text-xl font-semibold text-gray-400">Contact Details</h2>
                                <motion.p 
                                    className="flex items-center space-x-2"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, x: 10 }}
                                >
                                    <span>📞</span>
                                    <span>+91 7012674863</span>
                                </motion.p>
                                <motion.p 
                                    className="flex items-center space-x-2"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, x: 10 }}
                                >
                                    <span>✉️</span>
                                    <span>ebinebin54@gmail.com</span>
                                </motion.p>
                                <motion.p 
                                    className="flex items-center space-x-2"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, x: 10 }}
                                >
                                    <span>📍</span>
                                    <span>Elappara, Peerumade, Idukki, Kerala</span>
                                </motion.p>
                            </motion.div>

                            {/* Social Media Links with Enhanced Animations */}
                            <motion.div 
                                className="flex mt-4 space-x-4"
                                variants={itemVariants}
                            >
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${social.color} text-3xl`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ 
                                            scale: 1.2,
                                            rotate: [0, -10, 10, -10, 0],
                                            transition: { duration: 0.4 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <social.icon />
                                    </motion.a>
                                ))}
                            </motion.div>

                            {/* Animated Location SVG */}
                            <motion.div 
                                className="mt-8"
                                variants={itemVariants}
                            >
                                <motion.svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    className="w-16 h-16 text-orange-500"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 260, 
                                        damping: 20 
                                    }}
                                >
                                    <motion.path 
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                                        fill="currentColor"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2 }}
                                    />
                                </motion.svg>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Contact Form & Google Maps */}
                    <motion.div 
                        className="space-y-8"
                        variants={containerVariants}
                    >
                        {/* Contact Form with Staggered Inputs */}
                        <motion.div 
                            className="p-8 bg-gray-800 rounded-lg shadow-2xl"
                            variants={itemVariants}
                        >
                            <motion.form 
                                ref={formRef}
                                onSubmit={sendEmail}
                                className="space-y-6"
                                variants={containerVariants}
                            >
                                {['name', 'email', 'phone', 'message'].map((field, index) => (
                                    <motion.div 
                                        key={field}
                                        variants={itemVariants}
                                    >
                                        {field !== 'message' ? (
                                            <motion.input
                                                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                                name={field}
                                                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                                required
                                                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                whileFocus={{ scale: 1.02 }}
                                            />
                                        ) : (
                                            <motion.textarea
                                                name={field}
                                                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                                rows={5}
                                                required
                                                className="w-full p-3 bg-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                whileFocus={{ scale: 1.02 }}
                                            />
                                        )}
                                    </motion.div>
                                ))}

                                <motion.button
                                    type="submit"
                                    className="w-full p-3 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    variants={itemVariants}
                                >
                                    Send Message
                                </motion.button>

                                <AnimatePresence>
                                    {error && (
                                        <motion.p 
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="text-center text-red-500"
                                        >
                                            Failed to send message. Please try again.
                                        </motion.p>
                                    )}
                                    {success && (
                                        <motion.p 
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="text-center text-green-500"
                                        >
                                            Message sent successfully!
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.form>
                        </motion.div>

                        {/* Google Maps Embedded Frame */}
                        <motion.div 
                            className="overflow-hidden rounded-lg shadow-2xl"
                            variants={itemVariants}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 120, 
                                damping: 20 
                            }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.3333333333335!2d76.95555555555555!3d9.533333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzInMDAuMCJOIDc2wrA1NycyMy42IkU!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
}