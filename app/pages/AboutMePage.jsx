import React from 'react';
import Header from '../component/Header.jsx';
import Footer from '../component/Footer.jsx';
import './AboutMePage.css';
import { resumeUrl } from '../constants/constants.jsx';

// Icons
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CreateIcon from '@mui/icons-material/Create';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

const AboutMePage = () => {

    const handleSidebarLinkClick = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDownloadResume = () => {
        // Convert Google Drive view link to download link
        const driveId = resumeUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (driveId) {
            const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveId}`;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'Murat_Sahin_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const SidebarLink = ({ href, icon: Icon, text, isActive = false }) => {
        const sectionId = href.replace('#', '');
        return (
            <a href={href} onClick={(e) => handleSidebarLinkClick(e, sectionId)} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                {Icon && <Icon className="sidebar-icon" />}
                <p>{text}</p>
            </a>
        );
    };


    return (
        <div className="about-page">
            <Header />
            <div className="about-container">
                <aside className="sidebar">
                    <div className="sidebar-top">
                        {/* <div
                            className="profile-picture"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBg65H5USjg6t2qCPC3m15xxQ1oYS_P03edxQUDXtL51bQJ9l_FqQiTWlJcZAxCeVTHYYR9b2RLS7EJQWxlfQvwpO-YFcD88hPtVjoEUHRELgnLDM3LtX-Vce591sgP_m5pbhjo-LpiXA96flF6GwljXPVhZvmG1eOTp_-rfbSPUZG83ZFZIIDmi60y9IRoGkMRGwWtiMqFgvFKWIoyM0y9IGBtTRBQcRRpyEZF2QeHIts2xk-O-Vj-qwNhZugqpFt-lQo4N8mLXJY")' }}
                        /> */}
                        <div className="profile-info">
                            <h1>Murat Şahin</h1>
                            <p>Senior Software Developer</p>
                        </div>
                    </div>
                    <div className="sidebar-links">
                        <SidebarLink href="#education" icon={SchoolIcon} text="Education" />
                        <SidebarLink href="#experience" icon={WorkIcon} text="Experience" />
                                                <SidebarLink href="#projects" icon={CreateIcon} text="Projects" />
                        <SidebarLink href="#skill" icon={DonutSmallIcon} text="Skills" />
                    </div>
                    <button className="download-cv" onClick={handleDownloadResume}>Download Resume</button>
                </aside>

                {/* Main Content */}
                <main className="about-main">
                    {/* Education */}
                    <section className="section" id="education">
                        <div className="section-header">
                            <SchoolIcon />
                            <h2>Education</h2>
                        </div>
                        <div className="timeline">
                            <div className="timeline-content">
                                <p className="title">Istanbul Technical University</p>
                                <p className="subtitle">Electronics and Communication Engineering</p>
                                <p className="subtitle">2017-2021</p>
                                <p className="subtitle">GPA: 3.07</p>
                            </div>
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="section" id="experience">
                        <div className="section-header">
                            <WorkIcon />
                            <h2>Experiences</h2>
                        </div>
                        <div className="experience">
                            <div className="experience-item">
                                <div>
                                    <p className="title">Türkiye Finans Katılım Bankası</p>
                                    <p className="subtitle">Senior Software Developer</p>
                                    <p className="date">Ocak 2023 - Today</p>
                                    <ul>
                                        <li>Developed RESTful APIs using ASP.NET Entity Framework (MVC & Web API) for Treasury, Credit, and Trading applications, enabling secure and efficient integration across core banking systems.</li>
                                        <li>Optimized and created complex MSSQL queries and stored procedures to improve performance.</li>
                                        <li>Implemented user interfaces and business logic for several projects using React (JavaScript).</li>
                                        <li>Actively designed and developed essential screens and services for projects while troubleshooting issues and optimizing existing systems for improved performance and reliability.</li>
                                        <li>Designed and implemented applications with distributed architecture, ensuring scalability and resilience.</li>
                                        <li>Collaborated with UI/UX designers and product owners to deliver end-to-end financial solutions.</li>
                                    </ul>

                                </div>
                            </div>

                            <div className="experience-item">
                                <div>
                                    <p className="title">Definex Consulting</p>
                                    <p className="subtitle">Yazılım Geliştirici</p>
                                    <p className="date">Temmuz 2020 - Aralık 2021</p>
                                    <ul>
                                        <li>Designed and developed internal business applications (an education platform and an order-tracking system) using .NET and Vue.js, implementing a microservice-based architecture and delivering end-to-end functionality including UI design, service integration, and performance optimization.</li>
                                        <li>Contributed to the development of complex banking solutions such as “Letter of Inquiry Foreign Trade” (increasing customer profits 4x) and “Document Collection” (streamlining high-volume banking processes) using the PEGA System Application, ensuring compliance and process automation.</li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Projects */
                        <section className="section" id="projects">
                            <div className="section-header">
                                <CreateIcon />
                                <h2>Projects</h2>
                            </div>
                            <div className="experience">
                                <div className="experience-item">
                                    <div>
                                        <p className="title">Match Score App</p>
                                        <ul>
                                            <li>Built a cross-platform React Native app delivering real-time sports scores.</li>
                                            <li>Set up CI/CD pipelines with Docker and GitHub Actions for automated builds and deployments on a distributed system.</li>
                                            <li>Developed .NET (C#) and Python backend services with PostgreSQL as the database, Dockerized and deployed on a Linux VM in Google Cloud Platform (GCP).</li>
                                            <li>Implemented MVVM, Redux, and Context API for maintainable and performant state management.</li>
                                            <li>Integrated RESTful APIs and real-time data streams to provide seamless, up-to-date user experiences.</li>
                                            <li>Followed Clean Architecture principles, enabling modular, testable, and easily extensible code.</li>
                                            <li>Created reusable UI components following mobile UX best practices for iOS and Android.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>}

                    {/* Skills */}
                    <section className="section" id="skill">
                        <div className="section-header">
                            <DonutSmallIcon />
                            <h2>Skills</h2>
                        </div>
                        <div className="skills-grid">
                            <div className="skill-category">
                                <div className="experience-item">
                                    <ul>
                                        <li>C# (.Net), React, React Native, Vue/Vuetify, JavaScript, TypeScript, SQL (MSSQL, PostgreSQL),
                                            Docker, Git, Google Cloud Platform, Python, Pega System, OOP and SOLID principles, Asp .Net MVC,
                                            Agile, Azure, Jira, HTTP, LINQ
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AboutMePage;
