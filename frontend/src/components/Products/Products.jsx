import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/ProductAction";
import ProductCard from "../Home/ProductCard";
import Loading from "../layout/Loading";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Smartphones",
];

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    loading,
    products,
    error,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  let count = filteredProductsCount;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category,ratings));
  }, [dispatch, keyword, currentPage, price, error, category,ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h2 className="text-3xl my-10 roboto border-b w-60 p-4 text-center mx-auto">
            Products
          </h2>

          {/* Product Grid */}
          <div className="grid my-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 sm:px-20 md:px-48 place-items-center">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full w-full flex flex-col justify-center items-center h-64">
                <p className="text-xl text-gray-500 font-medium">
                  No products found.
                </p>
              </div>
            )}
          </div>

          {/* Filter Box */}
          <div className="filterbox relative md:fixed md:mx-0 mx-auto md:left-4 left-0 md:top-10 top-0 m-20 md:w-fit w-[80%] sm:w-[80%] px-4 p-2 bg-white shadow-lg rounded-md">
            <Typography>Price</Typography>
            <Slider
              value={price}
              min={0}
              max={25000}
              step={100}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
            <Typography>Categories</Typography>
            <ul className="flex flex-col gap-1 mt-2 text-sm ml-2">
              {categories.map((category) => (
                <li
                  className="text-gray-500 hover:text-rose-500 active:text-md font-semibold"
                  key={category}
                  onClick={() => setCategory(category)}>
                  {category}
                </li>
              ))}
            </ul>
            <fieldset className="mt-4 border px-4">
              <Typography component="legend" className="text-nowrap">
                Ratings Above
              </Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {/* Pagination */}
          {resultPerPage < count && (
            <div className="pagination w-full flex justify-center my-10">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="inline-block"
                linkClass="px-4 py-2 border rounded text-gray-600 hover:bg-blue-500 hover:text-white transition duration-300"
                activeClass="bg-blue-500 text-white"
                activeLinkClass="bg-blue-500 text-white"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
