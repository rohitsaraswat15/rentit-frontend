import React from 'react';
import type { ReactElement } from 'react';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram
} from 'react-icons/io';

interface TypeItem {
  name: string;
  link: string;
}

interface SocialIconsProps {
  Icons: TypeItem[];
}

const iconMap: Record<string,  ReactElement> = {
  'logo-facebook': <IoLogoFacebook />,
  'logo-twitter': <IoLogoTwitter />,
  'logo-github': <IoLogoGithub />,
  'logo-linkedin': <IoLogoLinkedin />,
  'logo-instagram': <IoLogoInstagram />
};

const SocialIcons: React.FC<SocialIconsProps> = ({ Icons }) => {
  return (
    <div className="text-teal-500">
      {Icons.map((icon) => (
        <span
          key={icon.name}
          className="p-2 cursor-pointer inline-flex items-center
          rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500 
          duration-300"
        >
          <a href={icon.link} target="_blank" rel="noopener noreferrer">
            {iconMap[icon.name]}
          </a>
        </span>
      ))}
    </div>
  );
};

export default SocialIcons;
