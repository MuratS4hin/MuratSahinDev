import React, { useState } from 'react';
import Header from '../component/Header.jsx';
import Footer from '../component/Footer.jsx';
import './ContactPage.css';

// MUI Icons
import MailIcon from "@mui/icons-material/Mail";
import PublicIcon from "@mui/icons-material/Public";
import CodeIcon from "@mui/icons-material/Code";

// Map icon strings → MUI Icon components
const iconMap = {
  mail: MailIcon,
  public: PublicIcon,
  code: CodeIcon,
};

// ContactInfo component
const ContactInfo = ({ icon, text, link, isEmail = false }) => {
  const Icon = iconMap[icon] || MailIcon; // fallback icon
  return (
    <a
      href={isEmail ? `mailto:${link}` : link}
      className="contact-info-item"
      target={!isEmail ? "_blank" : undefined}
      rel={!isEmail ? "noopener noreferrer" : undefined}
    >
      <Icon style={{ marginRight: "8px" }} />
      <span>{text}</span>
    </a>
  );
};

// Hook to manage form state
const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return [formData, handleChange];
};

const ContactPage = () => {
  const initialForm = { name: '', email: '', subject: '', message: '' };
  const [formData, handleChange] = useFormState(initialForm);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatusMessage({ type: 'error', message: 'Lütfen tüm alanları doldurun.' });
      return;
    }
    setStatusMessage({ type: 'loading', message: 'Mesajınız gönderiliyor...' });
    setTimeout(() => {
      console.log('Form gönderildi:', formData);
      setStatusMessage({ type: 'success', message: 'Mesajınız başarıyla gönderilmiştir. Teşekkür ederim!' });
    }, 1500);
  };

  return (
    <div className="contact-page">
      <Header />

      <div className="contact-container">
        <h1 className="contact-title">Contact</h1>

        <div className="contact-content">
          {/* Form (optional) */}
          {/* <div className="contact-form-section">
            ...
          </div> */}

          {/* Contact Info */}
          <div className="contact-info-section">
            <ContactInfo icon="mail" text="sahin.mur4t@gmail.com" link="sahin.mur4t@gmail.com" isEmail />
            <ContactInfo icon="public" text="LinkedIn" link="https://www.linkedin.com/in/murat-şahin-425969185/" />
            <ContactInfo icon="code" text="GitHub" link="https://github.com/MuratS4hin" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
