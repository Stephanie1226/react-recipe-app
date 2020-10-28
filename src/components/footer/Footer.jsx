import React from 'react';
import './Footer.styles.scss';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>© Copyright 2020. Created by{' '}
        <a target="_blank" rel="noopener noreferrer"
           href="https://stephanieportfolio-39f22.firebaseapp.com/#home">
             Stephanie Wang and Fangyu Hsu.
        </a>{' '}
        Designed by Fangyu Hsu.
      </p>
    </div>
  );
}

export default Footer;