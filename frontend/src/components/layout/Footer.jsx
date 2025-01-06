import React from "react";
import play from "/play.png";
import app from "/ap.png";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-8 px-4 mt-20 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Footer */}
        <div className="leftfooter flex flex-col items-center md:items-start gap-4">
          <h2 className="text-2xl font-semibold text-center">
            Download Our App
          </h2>
          <p className="text-center md:text-left">
            Download the app for Android and iOS mobile phones.
          </p>
          <div className="flex gap-4">
            <Link>
              <img
                className="w-40 bg-white rounded-lg shadow-md hover:scale-105 transition-transform"
                src={play}
                alt="Google Play"
              />
            </Link>
            <Link>
              <img
                className="w-40 bg-white rounded-lg shadow-md hover:scale-105 transition-transform"
                src={app}
                alt="App Store"
              />
            </Link>
          </div>
        </div>

        {/* Mid Footer */}
        <div className="midfooter text-center">
          <Link
            to="/"
            className="text-4xl text-nowrap md:text-7xl text-rose-500 font-bold birthstone">
            E-commerce
          </Link>
          <p className="mt-2 text-lg">High Quality is our Priority</p>
          <p className="mt-4 text-sm text-gray-400">
            &copy; 2024 Vishal Coder. All rights reserved.
          </p>
        </div>

        {/* Right Footer */}
        <div className="rightfooter flex flex-col items-center md:items-end gap-4">
          <h4 className="text-xl font-semibold">Follow Us</h4>
          <div className="flex gap-6 text-2xl">
            <Link
              to="https://www.instagram.com/web_developer_vishal/"
              className="hover:text-pink-500 transition-colors"
              aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link
              to="https://www.linkedin.com/in/vishaljangid786"
              className="hover:text-blue-500 transition-colors"
              aria-label="LinkedIn">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="wave bg-gradient-to-t from-zinc-800 to-transparent h-8 w-full mt-4"></div>
    </footer>
  );
};

export default Footer;
