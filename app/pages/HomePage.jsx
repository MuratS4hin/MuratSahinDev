import React from 'react';
import AquariumBackground from '../component/AquariumBackground.jsx';
import AquariumPlants from '../component/AquariumPlants.jsx';
import Header from '../component/Header.jsx';
import Footer from '../component/Footer.jsx';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import './HomePage.css';

const HomePage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="home-page">
            <div className="background-image"></div>
            <AquariumBackground />
            <AquariumPlants />
            <Header />
            <main className="home-main">
                <motion.div 
                    className="home-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="home-text" variants={itemVariants}>
                        <h1>
                            Hi, I'm Murat Şahin <br />
                            <span className="highlight">
                                <Typewriter
                                    words={['Full-Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Aquatic Coder']}
                                    loop={true}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h1>
                        {/* Changed color to slightly lighter gray for better contrast against water */}
                        <motion.h2 variants={itemVariants} style={{ color: '#e5e7eb' }}>
                            I develop modern and interactive web and mobile applications with a focus on user experience.
                            Check out the solutions I've created.
                        </motion.h2>
                    </motion.div>

                    <motion.div className="home-buttons" variants={itemVariants}>
                        <Link to="/projects" className="btn primary-btn">
                            My Projects
                        </Link>
                        <Link to="/about" className="btn secondary-btn">
                            More About Me
                        </Link>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;