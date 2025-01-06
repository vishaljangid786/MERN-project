import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings, // Use dynamic rating if available
    isHalf: true,
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="block hover:border w-fit bg-white shadow-md transition hover:scale-105 hover:shadow-2xl">
      <img
        src={product.images[0]?.url}
        alt={product.name}
        className="w-[250px] h-[280px] object-cover rounded-t-lg"
      />
      <div className="mt-4 p-3">
        <p className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </p>
        <div className="flex items-center mt-2">
          <ReactStars {...options} />
          <span className="ml-2 text-sm text-gray-600">
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span className="block mt-2 text-xl font-bold text-rose-500">
          ₹{product.price}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
