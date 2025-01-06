import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="w-[300px] border-[3px] shadow-lg m-5 p-2 flex flex-col items-center rounded-lg">
      <img
        className="w-32 overflow-hidden h-32 rounded-full"
        src="https://imgs.search.brave.com/6mjmF-EzeDn0GTtweyDSRV74VpNuw-RDizN6ZK_2aVk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzcyLzMy/Lzk4LzcyMzI5ODIz/MzYwZTU2MjY5ODk3/ODEzYTNkYmQ5OWI2/LmpwZw"
        alt=""
      />
      <p className="text-xl">{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
