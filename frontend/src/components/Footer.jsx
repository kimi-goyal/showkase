import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center">
      <a href="/about" className="mx-2">About</a>
      <a href="/contact" className="mx-2">Contact</a>
      <a href="/privacy" className="mx-2">Privacy</a>
      <div className="mt-2">
        <a href="#" className="mx-2">Facebook</a>
        <a href="#" className="mx-2">Twitter</a>
        <a href="#" className="mx-2">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;