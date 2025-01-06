import React from "react";

const Loading= () => {
return (
  <div className="flex flex-col gap-5 items-center justify-center h-screen bg-gradient-to-r from-teal-500 to-rose-500">
    {/* Rotating Box */}
    <div className="w-24 h-24 border-b border-white rounded-full box shadow-lg"></div>

    {/* Loading Text */}
    <p className="mt-6 text-3xl text-white font-semibold">Loading...</p>
  </div>
);
};

export default Loading;
