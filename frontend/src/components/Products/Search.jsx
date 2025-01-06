import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <Fragment>
      <form
        className="w-full bg-white flex items-center justify-center h-screen fixed top-0 left-0"
        onSubmit={searchSubmitHandler}>
        <input
          type="text"
          className="w-[50%] outline-none p-2 border-2 border-gray-300 px-4"
          placeholder="Search Your Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          className="px-8 border-l-transparent cursor-pointer bg-rose-500 hover:bg-transparent hover:text-black text-white transition hover:border-rose-500 border-rose-500 p-2 border-2"
          type="submit"
          value="Search"
        />
      </form>
    </Fragment>
  );
};

export default Search;
