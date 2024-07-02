import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../../components/shared/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SingleProduct = ({ product }) => {
  const { img, title, price, rating, ratedBy, description, bikeType } = product;
  return (
    <div className="p-3 border rounded shadow-inset space-y-2">
      <img src={img} alt="" className="" />
      <h2 className="text-xl font-medium font-roboto text-coral">{title}</h2>
      <div className="flex justify-between sm:text-base text-sm">
        <p className="font-medium text-stromboli">
          <b>Price: {price}</b>
        </p>
        <p className="font-medium text-stromboli">
          <i className="fas fa-biking mr-1"></i> {bikeType}
        </p>
      </div>
      <p>
        {description
          .split(" ")
          .slice(0, 12)
          .toString()
          .replace(/,/g, " ")
          .concat("...")}
      </p>
      <div className="flex justify-between sm:text-base text-sm">
        <div className="flex gap-1 items-center">
          <Rating
            initialRating={rating}
            emptySymbol=" text-coral sm:text-lg text-base"
            fullSymbol=" text-coral sm:text-lg text-base"
            readonly
          ></Rating>
          <span className="sm:text-lg text-base text-gray-700">
            {" "}
            ({ratedBy})
          </span>
        </div>
        <Link to={`/products/${product._id}`}>
          <button className="px-5 py-1 bg-green-custom text-white rounded">
            <FontAwesomeIcon icon={faPaperPlane} /> Purchase
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
