import React, { Fragment, useEffect, useState } from "react";
import Carousal from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/ProductAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loading from "../layout/Loading";
import { toast, ToastContainer } from "react-toastify";
import MetaData from "../layout/MetaData";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product?.ratings || 0, // Safeguard for undefined ratings
    isHalf: true,
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch(clearErrors());
    }

    if (!product || product._id !== id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, product, error]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <ToastContainer />
          <MetaData title={product?.name || "Product Details"} />

          {product ? (
            <div className="px-2 md:p-12 flex flex-col md:flex-row md:gap-10 gap-0">
              <div className="w-full sm:p-0 pt-4 h-fit md:w-1/2">
                <Carousal indicators={false} navButtonsAlwaysVisible={true}>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                        className="w-[400px] sm:h-[500px] h-auto mx-auto object-fit rounded-lg shadow-md"
                      />
                    ))}
                </Carousal>
              </div>

              <div className="w-full md:w-1/2 sm:p-4 px-4">
                <div className="space-y-6 sm:pb-0 pb-10">
                  <div className="border-b sm:p-4 p-0">
                    <h2 className="text-3xl font-bold mt-5">{product.name}</h2>
                    <p className="text-sm text-gray-500">
                      Product # {product._id}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 border-b pb-4">
                    <ReactStars {...options} />
                    <p className="text-sm text-gray-500">
                      ({product.numOfReviews || 0} Reviews)
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    <p className="text-xl font-bold text-rose-500">
                      ${product.price || "N/A"}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border w-fit rounded-lg">
                        <button
                          onClick={handleDecrease}
                          className="px-4 py-2 bg-gray-200 text-lg font-semibold disabled:opacity-50"
                          disabled={quantity <= 1}>
                          -
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            setQuantity(value ? parseInt(value, 10) : ""); // Allow clearing the field temporarily
                          }}
                          onBlur={(e) => {
                            if (
                              !e.target.value ||
                              isNaN(e.target.value) ||
                              parseInt(e.target.value, 10) < 1
                            ) {
                              setQuantity(1); // Reset to 1 if input is empty, invalid, or less than 1
                            }
                          }}
                          className="w-12 text-center outline-none border-gray-300 rounded-md"
                        />
                        <button
                          onClick={handleIncrease}
                          className="px-4 py-2 bg-gray-200 text-lg font-semibold">
                          +
                        </button>
                      </div>
                      <button className="w-fit px-8 py-3 bg-rose-500 text-white text-xl font-semibold rounded-lg hover:bg-rose-600 transition duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <p>
                    Status:{" "}
                    <b
                      className={
                        product.Stock < 1 ? "text-red-500" : "text-green-500"
                      }>
                      {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                    </b>
                  </p>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold">Description</h3>
                    <p className="text-gray-700">{product.description}</p>
                  </div>

                  <button className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-700 transition duration-300">
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <p className="text-xl text-gray-500">
                Unable to fetch product details. Please try again later.
              </p>
            </div>
          )}

          <div className="text-3xl border-b w-60 text-center mx-auto p-2 border-gray-400">
            Reviews
          </div>
          {product?.reviews && product.reviews.length > 0 ? (
            <div className="reviews flex overflow-auto gap-5">
              {product.reviews.map((review, index) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-xl text-gray-500 flex items-center justify-center h-40">
              No reviews yet
            </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
