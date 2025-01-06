import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const iconsRef = useRef([]);

  useEffect(() => {
    gsap.set(overlayRef.current, { y: "-100%" });
  }, []);

  const openMenu = () => {
    const tl = gsap.timeline();

    tl.to(overlayRef.current, {
      duration: 0.5, 
      opacity: 1,
      y: 0,
      ease: "power3.out",
      pointerEvents: "auto",
    })
      .fromTo(
        logoRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 
        "-=0.2"
      )
      .fromTo(
        navLinksRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power3.out" } 
      )
      .fromTo(
        iconsRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" } 
      );
  };


  const closeMenu = () => {
    gsap.to(overlayRef.current, {
      duration: 0.5,
      opacity: 0,
      y: "-100%",
      ease: "power3.in",
      pointerEvents: "none",
    });
  };

  return (
    <header className="fixed top-0 left-0 z-50 p-5 flex">
      {/* Menu Icon */}
      <div
        className="cursor-pointer text-3xl transition transform hover:scale-110"
        onClick={openMenu}>
        <IoMenu />
      </div>

      {/* Overlay Menu */}
      <div
        ref={overlayRef}
        className="fixed top-0 right-0 w-full h-screen opacity-0 pointe r-events-none transform flex flex-col items-center justify-center space-y-8 p-8 bg-zinc-800 text-white">
        {/* Close Button */}
        <button
          className="absolute top-4 left-5 text-3xl hover:text-red-500 transition transform hover:scale-110"
          onClick={closeMenu}>
          <IoMdClose />
        </button>

        <div className="flex items-center justify-around w-[80%] mx-auto py-5">
          {/* Logo */}
          <Link
            to="/"
            ref={logoRef}
            onClick={closeMenu}
            className="text-6xl birthstone brand tracking-wider text-center">
            E-Commerce
          </Link>

          {/* Navigation Links */}
          <nav className="flex space-x-6 text-center text-xl font-medium">
            {["Home", "Products", "Contact", "About"].map((item, index) => (
              <Link
                key={index}
                onClick={closeMenu}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-blue-400 transition duration-300"
                ref={(el) => (navLinksRef.current[index] = el)}>
                {item}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-6">
            {[
              { Icon: ImSearch, path: "/search" },
              { Icon: FiShoppingBag, path: "/cart" },
              { Icon: FaRegUser, path: "/profile" },
            ].map(({ Icon, path }, index) => (
              <Link
                key={index}
                onClick={closeMenu}
                to={path} // Specify the route for each icon
                ref={(el) => (iconsRef.current[index] = el)} // Assign ref to each icon wrapper
                className="text-3xl hover:text-blue-500 transition transform hover:scale-110 cursor-pointer">
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
