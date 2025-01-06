import React, { useEffect, Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import ScrollToPlugin
import MetaData from "../layout/MetaData";
import Product from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../layout/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(clearErrors());
    }
    if (!error) {
      dispatch(getProduct());
    }
  }, [dispatch, error]);

  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    // GSAP animation for the scroll button
    gsap.fromTo(
      ".scroll-btn",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "easeOut" }
    );
  }, []);

  // Smooth scroll function
  const scrollToSection = () => {
    gsap.to(window, {
      duration: 1, // 1 second scroll duration
      scrollTo: "#container", // Target element ID
      ease: "power2.inOut", // Smooth easing effect
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {/* ToastContainer is always present */}
          <ToastContainer />
          <MetaData title={"E-Commerce App"} />

          <div className="banner flex flex-col items-center justify-center w-full h-screen text-white px-6 brightness-95 relative bg-gradient-to-r from-teal-500 to-rose-500">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Ecommerce
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              FIND AMAZING PRODUCTS BELOW
            </p>
            <button
              className="scroll-btn flex gap-3 items-center text-xl bg-rose-500 text-white px-8 py-3 shadow-lg border-2 border-transparent hover:border-rose-500 hover:bg-transparent hover:text-rose-500 transition duration-300 ease-in-out"
              onClick={scrollToSection} // Trigger scroll on click
            >
              Scroll <CgMouse />
            </button>
          </div>

          <h1
            id="container"
            className="text-2xl text-zinc-700 roboto border-b p-5 mb-10 w-96 border-zinc-700 text-center mx-auto">
            Featured Products
          </h1>

          <div className="container flex justify-center gap-5 flex-wrap">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
