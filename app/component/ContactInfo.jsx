import React from 'react';

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

const ContactInfo = ({ icon, text, link, isEmail = false }) => {
  const Icon = iconMap[icon] || MailIcon;

  const handleClick = (e) => {
    if (!isEmail) {
      e.preventDefault();
      window.location.href = link;
    }
  };

  return (
    <a
      href={isEmail ? `mailto:${link}` : link}
      onClick={handleClick}
      className="contact-info-item"
      rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}
    >
      <Icon style={{ marginRight: "8px" }} />
      <span>{text}</span>
    </a>
  );
};

export default ContactInfo;
