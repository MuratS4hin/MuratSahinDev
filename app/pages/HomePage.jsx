import React from 'react';
import Header from '../component/Header.jsx';
import Footer from '../component/Footer.jsx';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <Header />

            <main className="home-main">
                <div className="home-content">
                    <div className="home-text">
                        <h1>Murat Şahin | Full-Stack Developer</h1>
                        <h2>
                            I develop modern and interactive web and mobile applications with a focus on user experience.
                            Check out the solutions I've created.
                        </h2>
                    </div>

                    <div className="home-buttons">
                        <Link to="/projects" className="btn primary-btn">
                            My Projects
                        </Link>
                        <Link to="/about" className="btn secondary-btn">
                            More About Me
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
